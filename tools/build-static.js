const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const files = [
  'index.html',
  'style.css',
  'tutorial.js',
  'lessons.json',
  'quiz-questions.json',
  'worked-examples.json',
  'tutorial-links.json',
  'video-tutorials.json',
  'video-notes.json',
  'visual-aids.json',
];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

console.log(`Built ${files.length} static files into dist/`);
