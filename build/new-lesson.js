'use strict';
// Scaffold a new lesson folder with a story.json skeleton to fill in.
// Usage: node new-lesson.js <id> "<Title>" "<Reference>"
//   e.g. node new-lesson.js prodigal-son "The Prodigal Son" "Luke 15:11-32"

const fs = require('fs');
const path = require('path');

const [, , id, title, reference] = process.argv;
if (!id) {
  console.error('Usage: node new-lesson.js <id> "<Title>" "<Reference>"');
  process.exit(1);
}
const dir = path.join(__dirname, '..', 'lessons', id);
if (fs.existsSync(dir)) { console.error('Lesson already exists:', dir); process.exit(1); }
fs.mkdirSync(path.join(dir, 'images'), { recursive: true });

const skeleton = {
  id,
  month: 0,
  weekOfMonth: 0,
  title: title || 'TITLE HERE',
  reference: reference || 'BOOK 0:0',
  bigIdea: 'ONE SENTENCE BIG IDEA.',
  memoryVerse: { text: 'MEMORY VERSE TEXT', reference: 'BOOK 0:0 (NIrV)' },
  moral: {
    lesson: 'THE CLEAR MORAL — what the story teaches, explained simply for kids.',
    application: 'THE "FOR YOU" LINE — how a child can live this out.',
  },
  style: "Flat-color children's cartoon storybook illustration, simple rounded shapes, soft warm colors, thick clean black outlines, bright and friendly, gentle lighting, 16:9 landscape composition, no text or words in the image, no letters.",
  character: 'DESCRIBE THE RECURRING CHARACTER so every image stays consistent (hair, clothing color, etc.)',
  beats: [1, 2, 3, 4, 5].map((n) => ({
    n,
    scene: `SCENE ${n}: describe what the picture should show.`,
    text: [`Narration line for beat ${n}.`, 'Second line.', 'Third line for more context.'],
  })),
};
fs.writeFileSync(path.join(dir, 'story.json'), JSON.stringify(skeleton, null, 2));
console.log('Created', path.join(dir, 'story.json'));
console.log('Next: edit story.json (incl. month + weekOfMonth), then:');
console.log(`  node generate-images.js ../lessons/${id}`);
console.log(`  node build-lesson.js ../lessons/${id}    # prints the dated .html name it wrote`);
console.log(`  powershell -File render-pdf.ps1 -Html <that-dated>.html`);
