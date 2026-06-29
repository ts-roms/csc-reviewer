# 🇵🇭 CSC Exam Review

A React + Vite study app for the **Philippine Civil Service Examination** (Career Service Professional & Sub-Professional). Questions are organized by exam section, each with an answer key and explanation.

## Sections

| Section | What it covers |
| --- | --- |
| 📖 Verbal Ability | Grammar, vocabulary, spelling, paragraph organization, reading comprehension (English & Filipino) |
| 🔢 Numerical Ability | Operations, fractions, percentages, ratio & proportion, word problems |
| 🧩 Analytical Ability | Word association, logic, abstract reasoning, conclusions |
| 🗂️ Clerical Operations | Filing, alphabetizing, attention to detail (Sub-Professional) |
| 🇵🇭 General Information | 1987 Constitution, RA 6713, peace & human rights, environmental laws |
| 📚 Pang-unawa sa Pagbasa (Filipino) | Filipino reading-comprehension passages with main-idea, vocabulary-in-context, and inference questions |

**224 questions** in total (45 Verbal · 45 Numerical · 45 Analytical · 30 Clerical · 50 General Information · 9 Filipino reading comprehension). Every question carries a written **explanation** that appears when you reveal the answer in Study mode or after submitting a Quiz/Mock Exam. The General Information section includes recently emphasized laws (RA 11032 Ease of Doing Business, RA 11313 Safe Spaces Act, RA 11223 Universal Health Care, RA 11210 Expanded Maternity Leave, RA 9710 Magna Carta of Women, RA 11479 Anti-Terrorism Act, and more).

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
npm run preview  # preview the production build
```

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

> ⚠️ For review and practice only. Always confirm facts and figures against current CSC materials and Philippine law.
