# 🇨🇭 Swiss Dev Project

> A full-stack developer portfolio project that helps users track jobs and companies. Built using modern technologies and deployed on GitHub and a personal Synology server.

---

## 📘 Overview

The **Swiss Dev Project** is a modular full-stack system demonstrating real-world application architecture. It includes a job and company tracking system, a Telegram bot interface, an intelligent agent layer, and a web frontend — all orchestrated in an Nx monorepo.

It showcases:

- Multi-environment testing (e2e)
- Microservice architecture
- AI-powered job matching (Ollama)
- Resume parsing
- Bot automation
- Containerized deployment

---

## 🗂️ Monorepo Structure

```bash
apps/
├── agent/               # Agent orchestration logic using Ollama
├── agent-e2e/           # E2E tests for agent
├── api/                 # Express backend API for jobs/companies
├── api-e2e/             # E2E tests for API
├── telegram-bot/        # Telegram bot for user interactions
├── telegram-bot-e2e/    # E2E tests for bot
├── web/                 # React frontend
└── web-e2e/             # E2E tests for web

libs/
├── data/                # Shared Mongo/Postgres data access logic
├── matcher/             # AI job matching algorithms (Ollama)
├── resume-parser/       # Resume/CV parsing utilities
└── types/               # Shared types across frontend/backend
```

---

## ⚙️ App Responsibilities

### `apps/api`

- **Type**: Express.js backend
- **Purpose**: CRUD for jobs and companies
- **Database**: PostgreSQL & MongoDB hybrid
- **Endpoints**: REST + future GraphQL extension

---

### `apps/agent`

- **Type**: AI Agent Orchestrator
- **Purpose**: Uses Ollama to analyze resumes and suggest job matches
- **Integration**: Calls matcher + resume-parser libraries

---

### `apps/telegram-bot`

- **Type**: Telegram Bot (Node.js)
- **Purpose**: Allow users to interact with the system through chat
- **Features**: Search jobs, submit resumes, get alerts

---

### `apps/web`

- **Type**: React (SPA)
- **Purpose**: Frontend interface
- **Features**: Job listings, company profiles, tracking dashboard
- **Framework**: Tailwind CSS, React Router

---

## 📦 Shared Libraries

### `libs/data`

- Database access logic for PostgreSQL and MongoDB
- Includes Prisma/TypeORM + Mongoose setup

### `libs/matcher`

- Job/candidate matching logic
- AI-enhanced search with Ollama

### `libs/resume-parser`

- NLP tools for extracting data from CVs
- Supports PDF and DOCX

### `libs/types`

- Global shared TypeScript interfaces

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/agilecharl/swiss-dev-project.git
cd swiss-dev-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root:

```
DATABASE_URL=postgres://...
MONGO_URL=mongodb://...
OLLAMA_MODEL=llama3
TELEGRAM_TOKEN=your-bot-token
```

---

## 🧪 Local Development

### Start Dev Servers

```bash
# API
nx serve api

# Web Frontend
nx serve web

# Telegram Bot
nx serve telegram-bot

# AI Agent
nx serve agent
```

### Run Tests

```bash
# All tests
nx run-many --target=test --all

# E2E tests
nx e2e api-e2e
```

---

## ⚒️ Build & Deployment

### Build All Apps

```bash
nx run-many --target=build --all
```

### Docker Deployment

```bash
docker-compose up --build
```

Deployed apps run on your **Synology server** and are publicly available via:

- **GitHub:** [github.com/agilecharl](https://github.com/agilecharl)
- **Web:** [agilecharl.com](https://agilecharl.com)

---

## 📡 API Reference

> **Base URL**: `/api`

### `GET /jobs`

- Returns a list of all jobs

### `POST /jobs`

- Create a new job posting

### `GET /companies`

- Returns list of companies

### `POST /resume`

- Uploads a resume and returns parsed data

_(More detailed OpenAPI spec coming soon)_

---

## 🏗 Architecture Diagram

```
                ┌────────────────────┐
                │     Frontend       │
                │    (React Web)     │
                └────────▲───────────┘
                         │
                         ▼
                ┌────────────────────┐
                │       API          │
                │ (Express Backend)  │
                └────────┬───────────┘
                         │
     ┌───────────────────┴──────────────┐
     │                                  │
     ▼                                  ▼
PostgreSQL (Jobs, Companies)     MongoDB (Tracking, Logs)

         ▲                              ▲
         │                              │
         └──────┐           ┌───────────┘
                ▼           ▼
         ┌──────────────┬──────────────┐
         │    Resume    │   Matcher    │
         │   Parser     │   (Ollama)   │
         └──────────────┴──────────────┘
                       ▲
                       │
                ┌──────┴──────┐
                │   Agent     │
                │ (Orchestrator) │
                └──────┬──────┘
                       │
              ┌────────▼────────┐
              │ Telegram Bot UI │
              └─────────────────┘
```

---

## 📅 Changelog

| Date       | Change                        |
| ---------- | ----------------------------- |
| 2025-07-29 | Initial Documentation Created |
| TBD        | Add GraphQL support           |
| TBD        | Integrate OAuth and user auth |

---

Let me know if you’d like:

- A **Confluence or Notion version**
- A **PDF export**
- Auto-generated **API docs** via Swagger or Postman
- A README version tailored for GitHub

Would you like this as a live documentation site too (using something like Docusaurus or Storybook for components)?
