# 🇵🇭 CSC Exam Review

A React + Vite study app for the **Philippine Civil Service Examination** (Career Service Professional & Sub-Professional). Questions are organized by exam section, each with an answer key and explanation.

## Sections

| Section | What it covers |
| --- | --- |
| 📖 Verbal Ability | Grammar, vocabulary, spelling, paragraph organization, reading comprehension (English & Filipino) |
| 🔢 Numerical Ability | Operations, fractions, percentages, ratio & proportion, word problems |
| 🧩 Analytical Ability | Word association, logic, abstract reasoning, conclusions |
| ♟️ Logical Reasoning | Syllogisms, logical deduction, number/letter series, coding-decoding, blood relations, direction sense, statement–conclusion |
| 🗂️ Clerical Operations | Filing, alphabetizing, attention to detail (Sub-Professional) |
| 🇵🇭 General Information | 1987 Constitution, RA 6713, peace & human rights, environmental laws |
| 📚 Pang-unawa sa Pagbasa (Filipino) | Filipino reading-comprehension passages with main-idea, vocabulary-in-context, and inference questions |
| 📰 Reading Comprehension (English) | English passages with main-idea, detail, vocabulary-in-context, and inference questions |

**321 questions** in total (50 Verbal · 50 Numerical · 50 Analytical · 50 Logical Reasoning · 50 Clerical · 50 General Information · 9 Filipino reading comprehension · 12 English reading comprehension). Every question carries a written **explanation** that appears when you reveal the answer in Study mode or after submitting a Quiz/Mock Exam. The **Logical Reasoning** section includes visual items — bar/line/pie charts for data interpretation and abstract-reasoning figures (dot series, rotating arrows, odd-one-out) rendered as self-contained inline SVG. The General Information section includes recently emphasized laws (RA 11032 Ease of Doing Business, RA 11313 Safe Spaces Act, RA 11223 Universal Health Care, RA 11210 Expanded Maternity Leave, RA 9710 Magna Carta of Women, RA 11479 Anti-Terrorism Act, and more).

> ℹ️ These are original **practice** questions written to match the current CSC exam coverage. The Civil Service Commission does not publicly release actual past exam questions, so no item here is a real/leaked exam question.

## Modes

- **📚 Study** — read each question with its correct answer and explanation. Reveal answers one at a time or all at once.
- **📝 Quiz** — answer a single section, submit, and get scored against the **80% CSC passing rating** with per-question feedback.
- **⏱️ Mock Exam** — a randomized, timed test drawn from **all sections** at once (25 / 50 / all questions, ~1 minute each). Auto-submits when the timer hits zero, then shows your rating and full answer key.

## Run it

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build (serves the PWA + service worker)
```

## Install it / use offline (PWA)

This is an installable **Progressive Web App**, so you can add it to your phone or desktop and study **with no internet connection**.

- **Install** — open the app in a browser and use the in-app **📲 Install** prompt (bottom-right), or your browser's install icon in the address bar. On iOS Safari: **Share → Add to Home Screen**.
- **Offline** — a [Workbox](https://developer.chrome.com/docs/workbox) service worker (via [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/)) precaches the whole app shell — HTML, JS, CSS, and all 321 questions/figures are bundled in the JS, so everything works offline once loaded.
- **Updates** — the service worker uses `autoUpdate`: new versions are fetched in the background and applied on the next launch.

> The service worker only runs in a production build (`npm run build` + `npm run preview`) served over `localhost`/HTTPS — it is disabled during `npm run dev`. App icons live in [`public/`](public/) (committed). To redesign them, install the one-off tool and regenerate: `npm i -D sharp && npm run icons`.

## Add your own questions

Edit [`src/data/questions.js`](src/data/questions.js). Each question is:

```js
{
  id: 'vb1',
  text: 'Question prompt...',
  options: ['A option', 'B option', 'C option', 'D option'],
  answer: 1,            // 0-based index of the correct option
  explanation: 'Why this answer is correct.',
}
```

### Visual questions (optional)

A question may also carry graphics. The SVG strings live in [`src/data/figures.js`](src/data/figures.js) and are rendered by the shared [`Figure`](src/components/Figure.jsx) component:

```js
{
  id: 'lr21',
  text: 'Study the bar chart. In which month were sales the highest?',
  figure: salesBarChart,            // inline SVG shown below the question
  options: ['January', 'February', 'March', 'April'],
  answer: 2,
  explanation: '...',
}
// Abstract reasoning — one SVG tile per option:
{
  id: 'lr28',
  text: 'Which figure comes next?',
  figure: dotSeriesPrompt,
  optionFigures: [dotTile(4), dotTile(5), dotTile(6), dotTile(3)],
  options: ['', '', '', ''],        // options can be blank when figures carry the choice
  answer: 0,
  explanation: '...',
}
```

Figures are self-contained inline SVG (no image files, no network), so they work offline.

> ⚠️ For review and practice only. Always confirm facts and figures against current CSC materials and Philippine law.
