# pkup-manager

Automatically generate Polish monthly creative work reports (PKUP) from your Jira activity. Fetches completed issues, summarizes them in Polish using Gemini AI, and outputs a professionally formatted PDF.

## Features

- **Jira Integration** — Fetches closed issues assigned to you for a selected month (19th prev month - 18th current month)
- **AI Summarization** — Gemini API generates Polish-language summaries with gender-aware verb conjugation
- **PDF Generation** — Produces A4-formatted reports via Puppeteer with employee details, task descriptions, and attachments
- **Report Management** — View, download, and delete past reports from the dashboard
- **Month Selector** — Generate reports for any of the last 12 months
- **Google OAuth** — Authentication via Supabase, restricted to company domain

## Tech Stack

| Layer      | Stack                                              |
|------------|----------------------------------------------------|
| Frontend   | React 19, TypeScript, Vite, MUI 7, TanStack Query |
| Backend    | Node.js, Express, Puppeteer, Google Gemini AI      |
| Database   | Supabase (PostgreSQL, Auth, Storage)               |
| External   | Atlassian Jira Cloud API                           |

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Supabase project
- Atlassian Cloud account
- Google Gemini API key

### Environment Variables

**`frontend/.env`**

```env
VITE_API_BASE_URL="http://localhost:3001"
VITE_SUPABASE_URL="<your-supabase-url>"
VITE_SUPABASE_ANON_KEY="<your-supabase-anon-key>"
```

**`backend/.env`**

```env
PORT=3001
CORS_ORIGIN="http://localhost:5173"
SUPABASE_URL="<your-supabase-url>"
SUPABASE_SERVICE_ROLE_KEY="<your-supabase-service-role-key>"
ATLASIAN_DOMAIN="https://<your-org>.atlassian.net"
GEMINI_API_KEY="<your-gemini-api-key>"
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev            # Run frontend + backend concurrently
npm run dev:frontend   # Frontend only (Vite on :5173)
npm run dev:backend    # Backend only (Express on :3001)
```

### Production Build

```bash
cd frontend && npm run build
cd backend && npm run build && npm start
```

## Project Structure

```
pkup-manager/
├── frontend/
│   └── src/
│       ├── api/               # Axios service layer
│       ├── components/        # Dashboard, settings, layout
│       ├── contexts/          # Auth & toast providers
│       ├── hooks/             # useGenerateReport flow
│       ├── query-hooks/       # TanStack Query wrappers
│       └── views/             # Login, Dashboard, Settings
├── backend/
│   └── src/
│       ├── routes/            # atlassian, gemini, reports
│       ├── middleware/        # JWT auth
│       ├── generateReportHtml.ts
│       └── server.ts
└── package.json               # Monorepo root
```

## API Endpoints

All routes require JWT authentication.

| Method   | Endpoint                       | Description              |
|----------|--------------------------------|--------------------------|
| `GET`    | `/api/atlassian/issues`        | Fetch Jira issues        |
| `POST`   | `/api/gemini/summarize-issues` | AI-summarize issues      |
| `POST`   | `/api/reports/generate`        | Generate PDF report      |
| `GET`    | `/api/reports/all`             | List user's reports      |
| `GET`    | `/api/reports/:id/download`    | Get signed download URL  |
| `DELETE` | `/api/reports/:id`             | Delete a report          |

## Report Generation Flow

```
Select month  ->  Fetch Jira issues  ->  Summarize with Gemini  ->  Generate PDF
                  (Step 1)               (Step 2)                   (Step 3)
```

Reports are stored in Supabase Storage and metadata is saved to the database.
