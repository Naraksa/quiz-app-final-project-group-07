# English Mastermind 🧠📚

A React-based quiz application that tests users on vocabulary and grammar, built as a final group project. English Mastermind lets users pick a difficulty level, answer a mix of vocabulary and grammar questions, and see their results broken down into score tiers.

**Live demo:** [https://quiz-app-final-project-group-07-silk.vercel.app](https://quiz-app-final-project-group-07-silk.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Notes](#architecture-notes)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Team & Roles](#team--roles)
- [Known Issues / In Progress](#known-issues--in-progress)

---

## Overview

English Mastermind is a client-side quiz app that walks users through:

1. Entering their name
2. Choosing a difficulty level
3. Answering a set of vocabulary and grammar questions
4. Reviewing their results, with per-question feedback and an overall score tier

Quiz progress is automatically persisted to `localStorage`, so a user can refresh the page mid-quiz without losing their state.

## Features

- 🎯 **Difficulty selection** — users choose a difficulty before starting
- 📝 **Two question types** — vocabulary and grammar questions, scored independently
- 💾 **Auto-save progress** — quiz state persists to `localStorage` via the reducer
- 🎨 **Color-coded scoring** — a `ScoreRing` component visualizes results using an emerald/rose tier system
- 🧭 **Multi-page flow** — routed pages for name entry, difficulty selection, quiz taking, and review, all sharing a common app shell
- ⚠️ **Error handling** — a root-level error boundary catches rendering/data errors across the app

## Tech Stack

| Category | Technology |
|---|---|
| UI Library | [React](https://react.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Routing | [React Router v6](https://reactrouter.com/) (`createBrowserRouter`) |
| State Management | React `useReducer` + Context API |
| Deployment | [Vercel](https://vercel.com/) |
| Linting | [oxlint](https://oxc.rs/docs/guide/usage/linter.html) (`.oxlintrc.json`) |

## Project Structure

```
quiz-app-final-project-group-07/
├── docs/                    # Project documentation
├── public/
│   └── data/                # Question banks, fetched at runtime
├── src/
│   ├── components/
│   │   ├── layout/          # App shell, nav, page wrappers
│   │   ├── quiz/            # Quiz-taking components (question cards, answer inputs, etc.)
│   │   └── ui/               # Reusable UI primitives (buttons, ScoreRing, etc.)
│   ├── context/              # QuizContext + reducer
│   ├── hooks/
│   │   └── useQuiz.js        # Single access point to QuizContext
│   ├── utils/
│   │   ├── constants.js      # QUIZ_TYPES, FETCH_STATUS, DIFFICULTY_LEVELS, SCORE_TIERS
│   │   └── scoring.js        # Pure scoring functions (e.g. getScoreColor)
│   ├── quizConfig.json       # Static quiz configuration (imported as an ES module)
│   ├── App.jsx                # Router + root error boundary
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

## Architecture Notes

These notes capture some of the key implementation decisions made across the project:

- **Routing:** The app uses a single `createBrowserRouter` instance with seven child routes rendered through a shared layout via `<Outlet />`. There's one root-level `errorElement` acting as the app's error boundary — there's no per-route error handling or `React.lazy`/Suspense-based data loading.
- **State management:** All quiz state lives in a single `QuizContext`, driven by a `useReducer` with typed actions — `SET_NAME`, `SET_DIFFICULTY`, `ANSWER_VOCAB`, `ANSWER_GRAMMAR`, and `RESET`. State auto-persists to `localStorage` on every update.
- **Accessing state:** Components never import `QuizContext` directly — they go through the `useQuiz()` hook, which returns `{ state, dispatch }` (not individual named setters).
- **Scoring:** Score tier thresholds live in `utils/constants.js` (`SCORE_TIERS`), and the pure calculation logic lives in `utils/scoring.js`. Note that `getScoreColor` returns a hex string, not a Tailwind class, so it's applied via inline `style={{ color }}` rather than a class name.
- **Data loading:** `quizConfig.json` is imported directly as an ES module (it's static config), while the actual question banks are fetched at runtime from `public/data/`.
- **Styling:** Built with Tailwind CSS v4. Page-level layout consistency (e.g. on the review page) is maintained with fixed-width wrapper utilities, and some backgrounds use a viewport-anchored `radial-gradient` with `background-attachment: fixed` for a fixed decorative effect.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Naraksa/quiz-app-final-project-group-07.git
cd quiz-app-final-project-group-07

# Install dependencies
npm install
```

### Running locally

```bash
npm run dev
```

This starts the Vite dev server — the app will be available at `http://localhost:5173` (or the next available port).

### Building for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Available Scripts

> These are the standard Vite project scripts. Check `package.json` for the exact list configured in this repo.

| Script | Description |
|---|---|
| `npm run dev` | Starts the local development server with hot reload |
| `npm run build` | Builds the app for production |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs the linter (`oxlint`) against the codebase |

## Team & Roles

This project was split across three role-based ownership areas:

| Role | Responsibility |
|---|---|
| **Role A: VISAL Long** | App shell & routing |
| **Role B: NARAKSA Veasna** | Data & context (quiz state, question data) |
| **Role C: VIRAKBOTH Kim** | UI components, styling, and page-level architecture |

## Known Issues / In Progress

- An `ErrorPage` component using React Router's `useRouteError` hook exists in an open pull request, intended to replace the default error boundary fallback with a friendlier, styled error page.
