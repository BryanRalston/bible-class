'use strict';
// Generate GROK_IMAGE_BRIEF.md — a hand-off doc for regenerating specific
// images in Grok (the consumer app) when the xAI API is unavailable.
// Lists, for each flagged beat, the exact prompt + filename + rules.
// Usage: node make-grok-brief.js

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const SITE = 'https://bryanralston.github.io/bible-class';

// which images need redoing, and a reference image (existing, good) to match style/character
const JOBS = [
  { id: 'lost-sheep',         beat: 1, ref: 'lessons/lost-sheep/images/02_lost-sheep.png',   refNote: 'the shepherd lessons for art style; Jesus look: ' + SITE + '/lessons/hidden-treasure-pearl/images/01_hidden-treasure-pearl.png' },
  { id: 'lost-son',           beat: 2, ref: 'lessons/lost-son/images/04_lost-son.png',         refNote: 'match THIS teenage son (dark hair, tan tunic)' },
  { id: 'lost-son',           beat: 3, ref: 'lessons/lost-son/images/04_lost-son.png',         refNote: 'match THIS teenage son (dark hair, tan tunic)' },
  { id: 'bags-of-gold',       beat: 2, ref: 'lessons/bags-of-gold/images/04_bags-of-gold.png', refNote: 'match the servants seen here (simple cream tunics)' },
  { id: 'bags-of-gold',       beat: 3, ref: 'lessons/bags-of-gold/images/04_bags-of-gold.png', refNote: 'match the servants seen here (simple cream tunics)' },
  { id: 'unmerciful-servant', beat: 1, ref: 'lessons/hidden-treasure-pearl/images/01_hidden-treasure-pearl.png', refNote: 'Jesus look (cream + blue robe). Peter must be in ANCIENT robes, NOT modern clothes' },
  { id: 'unmerciful-servant', beat: 3, ref: 'lessons/unmerciful-servant/images/02_unmerciful-servant.png',       refNote: 'match the servant in the brown tunic seen here' },
  { id: 'unmerciful-servant', beat: 4, ref: 'lessons/unmerciful-servant/images/02_unmerciful-servant.png',       refNote: 'match the servant in the brown tunic seen here' },
  { id: 'persistent-widow',   beat: 1, ref: 'lessons/the-farmer/images/01_the-farmer.png',     refNote: 'art-style reference only (clean flat cartoon)' },
  { id: 'persistent-widow',   beat: 5, ref: 'lessons/the-farmer/images/01_the-farmer.png',     refNote: 'art-style reference only; draw ONE praying child' },
];

function buildPrompt(story, beat) {
  let castDesc = '';
  let castClause = '';
  if (Array.isArray(beat.cast)) {
    castDesc = (story.characters ? beat.cast.map((k) => story.characters[k]).filter(Boolean).join(' ') : '');
    castClause = ' Show only the people described in this scene — do not add any other named characters.';
  } else if (story.character) {
    castDesc = `Main character: ${story.character}.`;
  }
  return [beat.scene, castDesc, castClause, story.style].filter(Boolean).join(' ');
}

const lessonCache = {};
function getStory(id) {
  if (!lessonCache[id]) lessonCache[id] = JSON.parse(fs.readFileSync(path.join(ROOT, 'lessons', id, 'story.json'), 'utf8'));
  return lessonCache[id];
}

let md = `# Image Regeneration Brief — for Grok (image generation)

**Purpose:** Recreate **10 specific pictures** for our kids' Bible lesson library.
Each one below has an EXACT prompt to use, the file name to save it as, and rules
so the new pictures match the ones we are keeping.

## How to use this
1. For each of the 10 images below, start a fresh image generation in Grok.
2. (Recommended) Upload the **reference image** link as an attachment so the art
   style and the recurring character match what we already have.
3. Copy the **PROMPT** text exactly and generate.
4. If it adds the wrong people or text, regenerate. Pick the best result.
5. **Download as PNG** and save it with the EXACT file name shown, into the matching folder.
6. When all 10 are saved, send them back / drop them in the folders and tell Cortex —
   Cortex will rebuild the lessons and re-publish (that step needs no credits).

## Global rules (apply to ALL 10)
- **Shape:** wide **16:9 landscape** (like a TV screen / slide). Not square, not portrait.
- **Absolutely NO text, letters, words, numbers, or signs** anywhere in the image.
- **Art style:** flat-color children's cartoon — simple rounded shapes, thick clean
  black outlines, soft warm colors, gentle lighting, friendly faces. (This is already
  written into each prompt.)
- **Keep recurring characters consistent** with the reference image (same hair, clothes, colors).
- **Only draw the people named in the prompt.** Do not add extra characters — this is the
  whole reason we're redoing these.
- Save as **PNG**, exact file name, exact folder. Do **not** touch any other images.

---
`;

JOBS.forEach((job, i) => {
  const story = getStory(job.id);
  const beat = story.beats.find((b) => b.n === job.beat);
  const prompt = buildPrompt(story, beat);
  const nn = String(job.beat).padStart(2, '0');
  const file = `${nn}_${job.id}.png`;
  const folder = `lessons/${job.id}/images/`;
  const notInclude = (beat.scene.match(/NOT (here|in this scene)|no one else|NOT modern/gi) || []).length
    ? '(see prompt — it states who must NOT appear)' : 'only the people named in the prompt';

  md += `
### Image ${i + 1} of 10 — ${story.title} (Week image #${job.beat})

- **Save as:** \`${file}\`
- **Folder:** \`${folder}\`
- **Reference image (upload to match):** ${SITE}/${job.ref}
  - _${job.refNote}_
- **Must include:** ${notInclude}

**PROMPT (copy everything between the lines):**

\`\`\`
${prompt}
\`\`\`

---
`;
});

md += `
## Final checklist before sending back
- [ ] 10 PNG files, each named exactly as listed (e.g. \`02_lost-son.png\`).
- [ ] Every image is wide 16:9 landscape.
- [ ] No words/letters anywhere in any image.
- [ ] No extra people — only those named in each prompt.
- [ ] Recurring characters match their reference image.

When done, hand the 10 files to Cortex (or place them in their folders) and say
"images are ready" — Cortex will embed them, rebuild the PDFs/HTML, and re-publish the site.
`;

fs.writeFileSync(path.join(ROOT, 'GROK_IMAGE_BRIEF.md'), md, 'utf8');
console.log('Wrote GROK_IMAGE_BRIEF.md with', JOBS.length, 'image specs.');
