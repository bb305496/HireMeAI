# 🤖 HireMeAI - AI-Powered CV Analyzer

![Angular](https://img.shields.io/badge/Angular-v21-DD0031?style=flat-square&logo=angular)
![NgRx](https://img.shields.io/badge/NgRx-v21-BA2BD2?style=flat-square&logo=redux)
![Kotlin](https://img.shields.io/badge/Kotlin-Spring_Boot-7F52FF?style=flat-square&logo=kotlin)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=github-actions)
![Live](https://img.shields.io/badge/Live-Demo_Available-22c55e?style=flat-square)

> Upload a CV and a Job Offer → Get an AI-powered match score and detailed analysis in seconds.

🔗 **Backend repo:** [HireMeAI Backend (Kotlin / Spring Boot)](https://github.com/bb305496/HireMeAIBackend)

A bleeding-edge full-stack web application that automatically analyzes and scores CVs against job offers using **Google Gemini AI**. Built as a technological showcase of the **Angular v21 experimental stack** - zoneless, signal-driven, and optimized for maximum performance.

---

## 🌐 Live Demo

> 🔴 **Live demo is currently offline** — server temporarily unavailable.
**👉 [https://hiremeai.duckdns.org](https://hiremeai.duckdns.org)**

### How to test it:
1. **Register** a free account - no email confirmation required
2. **Log in** - the CV analyzer is protected by an auth guard and requires an active session
3. **Upload your CV** in PDF format
4. **Provide a job offer** - paste it as raw text or provide a URL
5. **Get instant AI analysis** - match score, strengths, gaps, and recommendations powered by Google Gemini

---

## 🚀 The Vision: Pushing Angular to the Edge

This application was developed not just to solve the problem of manual CV screening, but as a technological experiment to implement and test the future of Angular (v21). The core philosophy is **maximum performance via native reactivity**.

### Why is this project technologically unique?

- **Native Zoneless Architecture** - The application runs entirely without `zone.js`. Change detection is driven natively by Angular Signals, eliminating the overhead of dirty-checking the entire component tree.
- **The v21 Stack** - Utilizing the latest releases of Angular and NgRx to leverage features like `selectSignal`, optimized `@defer` blocks.
- **Granular Performance** - Strategic combination of `OnPush` change detection with **Deferrable Views (`@defer`)** to minimize initial bundle size and optimize Core Web Vitals (LCP/TTI).

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose                                             |
|---|---|-----------------------------------------------------|
| Angular | v21 | Core framework - Zoneless enabled                   |
| NgRx | v21 | Global state management (Store, Effects, Selectors) |
| Angular Signals | native | Local reactive state & change detection             |
| RxJS | latest | Complex async streams & side effects                |

### Backend & AI
| Technology | Purpose |
|---|---|
| Kotlin / Spring Boot | Robust, secure REST API |
| Spring Security (JWT) | Authentication & authorization |
| Google Gemini AI | CV parsing & semantic job matching |

### DevOps
| Technology | Purpose |
|---|---|
| Docker | Containerized frontend & backend |
| GitHub Actions | CI/CD pipeline via version tags (`vx.x.x`) |
| VPS | Production deployment |

---

## 💻 Architecture

### Application Flow

```
                    ┌─────────────────────────┐
                    │        User visits       │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Auth Guard check     │
                    │  (JWT token valid?)     │
                    └──────┬──────────┬───────┘
                  No (redirect)     Yes
                    │                 │
                    ▼                 ▼
               Login/Register    CV Analyzer
                                     │
                    ┌────────────────┤
                    │                │
                    ▼                ▼
             Upload CV (PDF)   Job Offer input
                                (Text or URL)
                    │                │
                    └────────┬───────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │   Angular → Spring Boot API  │
              │       (JWT secured)          │
              └──────────────┬───────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │       Google Gemini AI       │
              │   (CV + Job Offer analysis)  │
              └──────────────┬───────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │       NgRx Store             │
              │  Effects → Reducer → State   │
              │  selectSignal() → UI update  │
              └──────────────────────────────┘
```

### Frontend Module Structure

```text
src/app
├── app.config.ts        <-- [Native Zoneless Configuration Enabled]
├── core
│   ├── analysis          <-- CV Analysis Feature (Gemini AI Integration)
│   │   ├── +state       <-- NgRx Store, Effects, Reducer, Selectors
│   │   ├── model        <-- Data Models for Analysis
│   │   └── services     <-- API Service (Gemini analysis requests)
│   ├── auth              <-- Authentication Feature (JWT)
│   │   ├── +state       <-- NgRx Auth State
│   │   ├── guard        <-- Route Guards
│   │   ├── model        <-- User / Token Models
│   │   └── services     <-- Auth API Service
│   ├── models           <-- Global Application Models
│   └── services         <-- Global Services (API Config)
├── ui                    <-- Reusable UI Modules
│   ├── modal            <-- Global Modal State (NgRx UI slice)
│   └── toast            <-- Reactive Toast Notification (Signals)
├── features              <-- Main View Components (Analyzer, Account, Home)
└── shared               <-- Dumb / Reusable Shared Components
```

---

## ⚙️ Key Technical Decisions

### Why Zoneless?
`zone.js` historically monkey-patches browser APIs to trigger Angular's change detection globally. In v21, Angular's Signal-based reactivity makes zone.js redundant. Running without it reduces bundle size, eliminates unnecessary re-renders, and makes the app more predictable and debuggable.

### Why NgRx over pure Signals?
For complex async flows - authentication, API error handling, retry logic - NgRx Effects provide a structured, testable pipeline. `store.selectSignal()` bridges NgRx and the Zoneless world, giving components reactive, Signal-based access to global state without manual subscriptions.

### Why `@defer`?
Heavy components (e.g. footer) are wrapped in `@defer (on viewport)` blocks. This means the initial bundle ships without them - they load only when the user scrolls them into view, directly improving LCP and TTI scores.

---

## 🔄 CI/CD Pipeline

Deployments are triggered automatically via **GitHub Actions** on version tags:

```
git tag v1.2.3
git push --tags
```

The pipeline builds Docker images for frontend and deploys to the VPS - zero manual steps required.

---

## 📬 Contact

Built and maintained by [@bb305496](https://github.com/bb305496).  
Feel free to open an issue or reach out via GitHub.
