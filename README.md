# PRISMORA AI — Frontend

**Version:** 1.0.0 (Frontend Staging)  
**Branch:** `frontend-staging`  
**Developer:** Ayush Kumar  
**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · React Router DOM 6 · Lucide React

---

## Overview

PRISMORA AI is a unified medical image analysis research platform. This repository contains the frontend application, which interfaces with a separately developed FastAPI + PyTorch backend for deep-learning-driven analysis of chest X-rays and retinal fundus images.

> **This is a research and demonstration project.** No real AI inference, patient data, or clinical decisions are made by this frontend.

---

## Prerequisites

| Tool | Minimum version |
|------|----------------|
| Node.js | 18.x LTS |
| npm | 9.x |

---

## Getting Started

### 1. Clone and enter the project

```bash
git clone <repository-url>
cd primoseAI
git checkout frontend-staging
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set `VITE_API_BASE_URL` to point to your FastAPI backend (default: `http://localhost:8000`).

### 4. Start the development server

```bash
npm run dev
```

The application will be available at **http://localhost:5173**.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## Project Structure

```
prismora-ai/
├── public/
│   ├── logo/              # Brand assets (SVG icons, wordmarks)
│   └── images/            # Static images served at root
│
├── src/
│   ├── assets/
│   │   ├── images/        # Imported image assets
│   │   └── icons/         # Custom SVG icon assets
│   │
│   ├── components/
│   │   ├── layout/        # App shell: Navbar, Sidebar, Footer, PageWrapper
│   │   ├── common/        # Shared primitives: Button, Badge, Card, Modal, etc.
│   │   ├── upload/        # Image upload & dropzone components
│   │   ├── results/       # Analysis result display components
│   │   ├── dashboard/     # Dashboard-specific widgets
│   │   └── auth/          # Login form and auth-related UI
│   │
│   ├── pages/             # Route-level page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ChestAnalysis.jsx
│   │   ├── RetinalAnalysis.jsx
│   │   ├── Results.jsx
│   │   ├── History.jsx
│   │   ├── Research.jsx
│   │   └── About.jsx
│   │
│   ├── routes/
│   │   └── index.jsx      # Centralised React Router configuration
│   │
│   ├── services/          # API communication layer
│   │   ├── api.js         # Axios/fetch base client + interceptors
│   │   ├── chestService.js
│   │   ├── retinaService.js
│   │   └── historyService.js
│   │
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Pure utility functions
│   ├── context/           # React context providers
│   │
│   ├── styles/
│   │   └── globals.css    # CSS reset, design tokens, global typography
│   │
│   ├── App.jsx            # Root component — router outlet
│   └── main.jsx           # Entry point
│
├── .env.example           # Environment variable template
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Route Map

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page |
| `/login` | Login | UI-only login demonstration |
| `/dashboard` | Dashboard | Research session overview |
| `/analysis/chest` | ChestAnalysis | Chest X-ray analysis interface |
| `/analysis/retina` | RetinalAnalysis | Retinal fundus analysis interface |
| `/results` | Results | Analysis results viewer |
| `/history` | History | Session and analysis history |
| `/research` | Research | Research notes and exports |
| `/about` | About | Project information |

---

## Design System

PRISMORA AI uses a bespoke design language built on Tailwind CSS extended tokens.

**Colour palette**
- Primary: Teal 600 `#0d9488`
- Secondary: Navy 600 `#1e3a5f`
- Background: Neutral 50 `#f8f9fa`
- Surface: White `#ffffff`
- Border: Neutral 200 `#e9ecef`

**Typography**  
Inter (display + body) · JetBrains Mono (code / data)

Design tokens are defined in `src/styles/globals.css` as CSS custom properties and extended in `tailwind.config.js`.

---

## Backend Integration

The backend (FastAPI + PyTorch) is developed separately. All API calls are routed through `src/services/api.js`.

Set `VITE_API_BASE_URL` in your `.env` file. No real requests are made in the current frontend-only phase.

---

## Important Restrictions

This frontend **does not** and **must not**:

- Implement real authentication or user registration
- Display fabricated AI predictions, confidence scores, or accuracy values
- Store or transmit real patient data
- Connect to any cloud medical image storage

---

## Git Workflow

```bash
# Working branch
git checkout frontend-staging

# Commit convention
git commit -m "feat(component): add Navbar layout shell"
git commit -m "fix(router): correct RetinalAnalysis path"
git commit -m "style(tokens): add shadow scale to globals.css"
```

---

## License

Academic research project. All rights reserved — Ayush Kumar.
