'use strict';
// Build a print-ready, self-contained HTML lesson from story.json + images.
// Usage: node build-lesson.js <lessonDir>
//   e.g. node build-lesson.js ../lessons/lost-sheep
// Output: <lessonDir>/<id>.html  (images embedded as base64 -> fully portable)

const fs = require('fs');
const path = require('path');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function imgDataUri(file) {
  const b64 = fs.readFileSync(file).toString('base64');
  const ext = path.extname(file).toLowerCase();
  const mime = (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'image/png';
  return `data:${mime};base64,${b64}`;
}

function resolveBeatImage(imgDir, n, id) {
  const base = `${String(n).padStart(2, '0')}_${id}`;
  for (const ext of ['.png', '.jpg', '.jpeg']) {
    const p = path.join(imgDir, base + ext);
    if (fs.existsSync(p)) return p;
  }
  throw new Error(`Missing image for beat ${n}: expected ${base}.png|.jpg in ${imgDir}`);
}

function main() {
  const lessonDir = path.resolve(process.argv[2] || '.');
  const story = JSON.parse(fs.readFileSync(path.join(lessonDir, 'story.json'), 'utf8'));
  const imgDir = path.join(lessonDir, 'images');

  const MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dated = story.month && story.weekOfMonth;
  const prefix = dated
    ? `${String(story.month).padStart(2, '0')}-W${story.weekOfMonth}_${story.id}`
    : story.id;
  const weekLabel = dated ? `${MONTHS[story.month]} — Week ${story.weekOfMonth}` : '';

  const beatPages = story.beats.map((beat) => {
    const file = resolveBeatImage(imgDir, beat.n, story.id);
    const uri = imgDataUri(file);
    const isLast = beat.n === story.beats.length;
    const paras = beat.text.map((t, i) => {
      const last = isLast && i === beat.text.length - 1;
      return `<p class="${last ? 'big-idea' : ''}">${esc(t)}</p>`;
    }).join('\n        ');
    return `
    <section class="page image-page">
      <img src="${uri}" alt="Illustration ${beat.n}">
    </section>
    <section class="page text-page">
      <div class="text-inner">
        <h2>Image ${beat.n}</h2>
        ${paras}
      </div>
    </section>`;
  }).join('\n');

  const mv = story.memoryVerse
    ? `<div class="verse"><p class="verse-text">“${esc(story.memoryVerse.text)}”</p><p class="verse-ref">${esc(story.memoryVerse.reference)}</p></div>`
    : '';

  const moralPage = story.moral
    ? `
    <section class="page moral-page">
      <div class="moral-inner">
        <div class="kicker">What We Learn</div>
        <p class="moral-lesson">${esc(story.moral.lesson)}</p>
        ${story.moral.application ? `<p class="moral-app"><span>For you:</span> ${esc(story.moral.application)}</p>` : ''}
      </div>
    </section>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(story.title)} — ${esc(story.reference)}</title>
<style>
  @page { size: 13.333in 7.5in; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
    color: #1b1b1b;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .page {
    width: 13.333in; height: 7.5in;
    page-break-after: always; break-after: page;
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .page:last-child { page-break-after: auto; }

  /* Image slides: fill the page, image centered/cover */
  .image-page { background: #f4f1ea; padding: 0; }
  .image-page img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* Narration slides */
  .text-page { background: #ffffff; }
  .text-inner { width: 78%; max-width: 9.4in; }
  .text-page h2 {
    font-size: 27pt; font-weight: 600; color: #2b2b2b;
    margin: 0 0 0.35in 0;
  }
  .text-page p {
    font-size: 23pt; line-height: 1.4; margin: 0 0 0.24in 0; color: #1b1b1b;
  }
  .text-page p.big-idea {
    font-weight: 700; color: #2e6f4e; margin-top: 0.38in; font-size: 24pt;
  }

  /* Title slide */
  .title-page {
    flex-direction: column; text-align: center;
    background: radial-gradient(circle at 50% 30%, #ffffff 0%, #eef3ee 100%);
  }
  .title-page .kicker { font-size: 17pt; letter-spacing: 2px; text-transform: uppercase; color: #2e6f4e; margin-bottom: 0.25in; }
  .title-page h1 { font-size: 50pt; font-weight: 800; margin: 0 0 0.18in 0; color: #20302a; line-height: 1.1; }
  .title-page .ref { font-size: 24pt; color: #555; margin: 0 0 0.3in 0; }
  .title-page .key-q { font-size: 22pt; font-weight: 600; color: #2e6f4e; margin: 0 0 0.35in 0; }
  .verse { max-width: 8.5in; }
  .verse-text { font-size: 24pt; font-style: italic; color: #2b2b2b; line-height: 1.4; margin: 0 0 0.12in 0; }
  .verse-ref { font-size: 16pt; color: #2e6f4e; margin: 0; }
  .big-idea-banner { margin-top: 0.45in; font-size: 21pt; font-weight: 700; color: #2e6f4e; }

  /* What We Learn (moral) slide */
  .moral-page {
    flex-direction: column; text-align: center;
    background: radial-gradient(circle at 50% 25%, #ffffff 0%, #eef3ee 100%);
  }
  .moral-inner { width: 80%; max-width: 9.6in; }
  .moral-page .kicker {
    font-size: 18pt; letter-spacing: 2px; text-transform: uppercase;
    color: #2e6f4e; margin-bottom: 0.4in; font-weight: 700;
  }
  .moral-lesson { font-size: 27pt; line-height: 1.4; color: #20302a; margin: 0 0 0.45in 0; font-weight: 600; }
  .moral-app { font-size: 23pt; line-height: 1.4; color: #1b1b1b; margin: 0; }
  .moral-app span { color: #2e6f4e; font-weight: 700; }

  /* On-screen viewing (browser): center each page on a soft backdrop.
     Print is unaffected — it uses the @page rules above. */
  @media screen {
    body { background: #20222b; padding: 28px 12px; }
    .page {
      margin: 0 auto 28px auto;
      box-shadow: 0 8px 30px rgba(0,0,0,0.45);
      border-radius: 6px;
      max-width: 100%;
    }
    .image-page img { border-radius: 6px; }
  }
</style>
</head>
<body>
  <section class="page title-page">
    <div class="kicker">Kids Bible Class${weekLabel ? ' &middot; ' + esc(weekLabel) : ''}</div>
    <h1>${esc(story.title)}</h1>
    <div class="ref">${esc(story.reference)}</div>
    ${story.keyQuestion ? `<div class="key-q">${esc(story.keyQuestion)}</div>` : ''}
    ${mv}
    <div class="big-idea-banner">${esc(story.bigIdea)}</div>
  </section>
${beatPages}
${moralPage}
</body>
</html>`;

  const out = path.join(lessonDir, `${prefix}.html`);
  fs.writeFileSync(out, html, 'utf8');
  console.log('Wrote', out, `(${(html.length / 1024 / 1024).toFixed(2)} MB)`);
}
main();
