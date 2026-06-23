# Grade 6 Mid Mock Exam Revision 2026

A static web app for Grade 6 exam revision. It helps students study lessons, practise flashcards, answer topic quizzes, and sit mock exams by subject or across all subjects.

## Features

- Subject lessons for Maths, English, Social Science, Health, and Science
- Topic tests with multiple-choice and short-answer questions
- Mock exams by subject or all subjects
- Exam mode, where answers are shown at the end
- Learning mode, where students can check answers and explanations while practising
- Custom mock exam timing, including 30 minutes, 1 hour, 1 hour 30 minutes, 2 hours, or custom minutes
- Study flashcards with model answers
- Visual aids and video lesson notes for topics that benefit from diagrams or pictures
- Local progress saved on the student's device

## Run Locally

This is a static HTML/CSS/JavaScript app.

```bash
npm run build
```

Then serve the `dist/` folder with any static server.

For a quick local preview from the project root:

```bash
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173/
```

## Deploy on Render

This repo includes `render.yaml`, so it can be deployed as a Render Static Site.

Render settings:

- Service type: Static Site
- Build command: `npm run build`
- Publish directory: `dist`

You can deploy either by creating a Render Static Site manually or by using Render Blueprints.

## Project Files

- `index.html` - app markup
- `style.css` - app styling
- `tutorial.js` - app logic
- `lessons.json` - lesson content
- `quiz-questions.json` - MCQ and short-answer questions
- `worked-examples.json` - study flashcards and model answers
- `visual-aids.json` - images and diagram prompts for lessons
- `video-tutorials.json` - linked video lessons
- `video-notes.json` - student-friendly notes based on linked videos
- `tutorial-links.json` - external learning resources
- `tools/build-static.js` - build script for Render
- `tools/check-video-transcripts.py` - helper script to check YouTube transcript availability

## Notes

YouTube transcripts are not stored verbatim in this repo. Video notes are written as student-friendly summaries to support learning while respecting video content ownership.

Student progress is stored in the browser's `localStorage`, so progress is device-specific.
