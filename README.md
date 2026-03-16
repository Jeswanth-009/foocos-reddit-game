# Foocos — Focus Timing Game (Reddit)

**Foocos** is a small, addictive timing game built as a Reddit micro-app using **Devvit Web**. It runs inside Reddit as an embedded iframe and challenges players to stop a timer as close to their target time as possible.

> ⚡️ **Goal:** Pick a target time, hit start, and stop the timer when you think the target has passed. Hit within **10ms** for **GOD MODE**!

---

## 🎮 How the Game Works

### Gameplay
- Choose a **target time** (e.g., 5.00 seconds).
- Press **START FOCUS** to begin the timer.
- Press **STOP** when you think the target time has elapsed.
- Your score is based on how close your final time is to the target.

### Features
- **Blind Mode**: Hide the timer once you're past half of the target time to make it harder.
- **GOD MODE**: Stop within **±0.01s** and you earn the perfect focus badge.
- **Instant feedback**: Toast notifications show when you hit a near-perfect or perfect run.

---

## 🧩 Where the Code Lives

### Client (UI)
- `src/client/game.tsx` — Main game UI + logic (expanded view)
- `src/client/splash.tsx` — Start screen (inline view)
- `src/client/index.css` — Styling for the game UI

### Devvit Integration
- `devvit.json` — App configuration and entrypoint mapping used by Devvit.
  - `splash.html` is used for the inline view (feed).
  - `game.html` is used for the expanded view (modal).

### Server (backend)
This repo has server scaffolding for Devvit services, but the game itself is entirely client-driven.
- `src/server/index.ts` — Hono server entrypoint
- `src/server/routes/` — API routes (currently no game-specific endpoints)

---

## 🚀 Setup & Development (Local)

### Prerequisites
- Node.js **v22** (required by Devvit)
- A Reddit account with a Devvit developer app
- Devvit CLI installed (`npm install -g @devvit/cli` if not already)

### 1) Install dependencies

```bash
npm install
```

### 2) Login to Devvit

```bash
npm run login
```

### 3) Start the dev server

```bash
npm run dev
```

This launches the local Devvit runtime and opens the game inside Reddit.

---

## 🛠 Build & Deploy

### Build production assets

```bash
npm run build
```

### Deploy a new app version

```bash
npm run deploy
```

### Publish for Reddit review

```bash
npm run launch
```

---

## 🧠 How to Extend Foocos

### Add a new UI entrypoint
1. Add `src/client/myNewView.html`
2. Add a matching React entry file (e.g., `src/client/myNewView.tsx`)
3. Register it in `devvit.json` under `entrypoints`

### Add backend logic
1. Create a new route under `src/server/routes/`
2. Wire it into `src/server/index.ts`
3. Call it from the client using `fetch` or `@devvit/web/client` APIs

---

If you'd like, I can also help you add: 
- **User score tracking**, 
- **Leaderboards**, 
- **Persistent storage (Redis)**, or 
- **A GitHub Actions CI workflow** to run `npm run type-check` on every push.
