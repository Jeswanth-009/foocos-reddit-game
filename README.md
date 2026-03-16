# Foocos Reddit Game

A small Reddit game built on **Devvit Web** that runs inside Reddit as a micro-frontend (iframe). This repository includes a React + Tailwind front end and a serverless Node backend (Hono + tRPC) to power the game logic.

## ✅ What’s Included

- **Client (React + Vite)**: Renders game UI inside Reddit views (inline + expanded).
- **Server (Hono + tRPC)**: Handles game state, form submissions, and any backend logic via Devvit serverless runtime.
- **Devvit Integration**: Uses `devvit.json` to register entrypoints for Reddit’s UI (inline & expanded view).

## 🚀 Quick Start (Dev Environment)

### 1) Prerequisites

- Node.js **v22** (required by Devvit)
- A Reddit account and a Devvit developer app configured
- [Devvit CLI](https://developers.reddit.com/docs/devvit/cli/)

### 2) Install

```bash
npm install
```

### 3) Login (Devvit CLI)

```bash
npm run login
```

### 4) Run locally (Live Reload)

```bash
npm run dev
```

This will start the Devvit local server and open the app inside Reddit with live reloading.

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Upload a New Version (Deploy)

```bash
npm run deploy
```

### Publish to Reddit for Review

```bash
npm run launch
```

> Tip: Use `npm run dev` while iterating; it’s the fastest way to validate changes.

## 🧠 Project Structure

```
src/
  client/          # React UI (runs in the browser iframe)
    game.html      # Expanded view entrypoint
    splash.html    # Inline view entrypoint
    game.tsx       # Main game UI (expanded)
    splash.tsx     # Compact preview UI (inline)
    global.ts      # Shared client constants/utilities

  server/          # Devvit server code (runs in Devvit runtime)
    index.ts       # Hono server entrypoint
    routes/        # API and form endpoints

  shared/          # Types and helpers shared between client/server
    api.ts

devvit.json        # Devvit app configuration (entrypoints + metadata)
```

## ✅ How to Extend

- Add a new UI page: create an `*.html` entrypoint under `src/client` and register it in `devvit.json`.
- Add server logic: create a new route under `src/server/routes/` and wire it into `src/server/index.ts`.
- Share types: add them to `src/shared` and import in both client/server.

## 🧪 Useful Commands

- `npm run type-check` – Runs TypeScript type-check + lint
- `npm test` – Runs unit tests (if any)
- `npm run lint` – Runs linter

---

If you want help adding new game features or hooking up persistent storage (Redis, etc.), just ask! 💡
