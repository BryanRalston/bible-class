'use strict';
// Generate illustrations for a Bible-class lesson from its story.json.
// Usage: node generate-images.js <lessonDir>
//   e.g. node generate-images.js ../lessons/lost-sheep
// Reads story.json, calls the xAI grok-imagine-image API once per beat,
// and writes images/01_<id>.png ... into the lesson folder.

const fs = require('fs');
const path = require('path');

const KEY = process.env.XAI_API_KEY;
const MODEL = 'grok-imagine-image';
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function genOne(prompt) {
  const res = await fetch('https://api.x.ai/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt, n: 1, response_format: 'b64_json' }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`API ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  const item = json.data && json.data[0];
  if (!item || !item.b64_json) throw new Error('no image in response');
  return Buffer.from(item.b64_json, 'base64');
}

async function genWithRetry(prompt, label, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try { return await genOne(prompt); }
    catch (e) {
      console.log(`  [${label}] attempt ${i} failed: ${e.message}`);
      if (i === tries) throw e;
      await delay(4000 * i);
    }
  }
}

async function main() {
  if (!KEY) { console.error('XAI_API_KEY not set'); process.exit(1); }
  const lessonDir = path.resolve(process.argv[2] || '.');
  const story = JSON.parse(fs.readFileSync(path.join(lessonDir, 'story.json'), 'utf8'));
  const imgDir = path.join(lessonDir, 'images');
  fs.mkdirSync(imgDir, { recursive: true });

  for (const beat of story.beats) {
    const file = path.join(imgDir, `${String(beat.n).padStart(2, '0')}_${story.id}.png`);
    if (fs.existsSync(file) && !process.argv.includes('--force')) {
      console.log(`Beat ${beat.n}: exists, skipping (use --force to regenerate)`);
      continue;
    }
    // Who appears in THIS scene. If a beat lists `cast`, only those characters
    // (looked up in story.characters) are described + a "no one else" clause —
    // this stops a character from bleeding into scenes they don't belong in.
    // Falls back to the global `story.character` for simple single-cast lessons.
    let castDesc = '';
    let castClause = '';
    if (Array.isArray(beat.cast)) {
      castDesc = (story.characters ? beat.cast.map((k) => story.characters[k]).filter(Boolean).join(' ') : '');
      castClause = ' Show only the people described in this scene — do not add any other named characters.';
    } else if (story.character) {
      castDesc = `Main character: ${story.character}.`;
    }
    const prompt = [beat.scene, castDesc, castClause, story.style].filter(Boolean).join(' ');
    console.log(`Beat ${beat.n}: generating...`);
    const buf = await genWithRetry(prompt, `beat${beat.n}`);
    fs.writeFileSync(file, buf);
    console.log(`Beat ${beat.n}: saved ${path.basename(file)} (${(buf.length / 1024).toFixed(0)} KB)`);
    await delay(1500);
  }
  console.log('Done.');
}
main().catch((e) => { console.error('ERR', e.message); process.exit(1); });
