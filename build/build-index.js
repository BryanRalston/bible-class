'use strict';
// Build the landing page (index.html at the repo root) that lists every lesson.
// Data-driven: scans lessons/*/story.json so new lessons appear automatically.
// Usage: node build-index.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LESSONS = path.join(ROOT, 'lessons');
const MONTHS = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function main() {
  const lessons = fs.readdirSync(LESSONS, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const sp = path.join(LESSONS, d.name, 'story.json');
      if (!fs.existsSync(sp)) return null;
      const s = JSON.parse(fs.readFileSync(sp, 'utf8'));
      const dated = s.month && s.weekOfMonth;
      const prefix = dated
        ? `${String(s.month).padStart(2, '0')}-W${s.weekOfMonth}_${s.id}`
        : s.id;
      return {
        id: s.id,
        title: s.title,
        reference: s.reference,
        bigIdea: s.bigIdea || '',
        week: dated ? `${MONTHS[s.month].slice(0, 3)} · Week ${s.weekOfMonth}` : '',
        sortKey: (s.month || 99) * 100 + (s.weekOfMonth || 99),
        html: `lessons/${d.name}/${prefix}.html`,
        pdf: `lessons/${d.name}/${prefix}.pdf`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.sortKey - b.sortKey);

  const cards = lessons.map((l) => `
      <article class="card">
        <div class="card-week">${esc(l.week)}</div>
        <h2>${esc(l.title)}</h2>
        <div class="ref">${esc(l.reference)}</div>
        <p class="idea">${esc(l.bigIdea)}</p>
        <div class="actions">
          <a class="btn btn-primary" href="${l.html}">View&nbsp;lesson</a>
          <a class="btn" href="${l.pdf}">PDF</a>
        </div>
      </article>`).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kids Bible Class — Lessons</title>
<style>
  :root { --green:#2e6f4e; --ink:#20302a; --bg:#eef3ee; }
  * { box-sizing: border-box; }
  body {
    margin: 0; font-family: "Segoe UI", system-ui, Arial, sans-serif; color: var(--ink);
    background: radial-gradient(circle at 50% -10%, #ffffff 0%, var(--bg) 60%);
    min-height: 100vh;
  }
  header { text-align: center; padding: 48px 20px 12px; }
  header .kicker { color: var(--green); letter-spacing: 2px; text-transform: uppercase; font-size: 14px; font-weight: 700; }
  header h1 { font-size: clamp(28px, 5vw, 44px); margin: 8px 0 6px; }
  header p { color: #557; max-width: 620px; margin: 0 auto; font-size: 17px; line-height: 1.5; }
  main { max-width: 1100px; margin: 0 auto; padding: 24px 20px 64px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
  .card {
    background: #fff; border: 1px solid #e3e9e3; border-radius: 14px; padding: 22px 22px 20px;
    box-shadow: 0 4px 18px rgba(20,40,30,0.06); display: flex; flex-direction: column;
  }
  .card-week { color: var(--green); font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
  .card h2 { font-size: 21px; margin: 8px 0 4px; line-height: 1.25; }
  .card .ref { color: #678; font-size: 14px; margin-bottom: 10px; }
  .card .idea { color: #333; font-size: 15px; line-height: 1.5; margin: 0 0 18px; flex: 1; }
  .actions { display: flex; gap: 10px; }
  .btn {
    flex: 1; text-align: center; text-decoration: none; padding: 10px 14px; border-radius: 9px;
    font-weight: 600; font-size: 15px; border: 1.5px solid var(--green); color: var(--green); background: #fff;
    transition: all .15s;
  }
  .btn:hover { background: #eef6f0; }
  .btn-primary { background: var(--green); color: #fff; }
  .btn-primary:hover { background: #245c40; }
  footer { text-align: center; color: #8a978f; font-size: 13px; padding: 0 20px 40px; }
</style>
</head>
<body>
  <header>
    <div class="kicker">Kids Bible Class</div>
    <h1>Bible Story Lessons</h1>
    <p>Illustrated story lessons for our kids. Tap <strong>View lesson</strong> to read through the pictures and narration in your browser, or <strong>PDF</strong> to print or project it.</p>
  </header>
  <main>
    <div class="grid">
${cards}
    </div>
  </main>
  <footer>Each lesson ends with a “What We Learn” page — a clear, kid-friendly takeaway.</footer>
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf8');
  console.log(`Wrote index.html with ${lessons.length} lessons.`);
}
main();
