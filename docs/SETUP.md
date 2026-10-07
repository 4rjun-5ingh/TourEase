# TourEase — Development Environment Setup

## Prerequisites

- **Python 3.10+** — [python.org](https://www.python.org/downloads/)
- **Node.js 18+ (LTS)** — [nodejs.org](https://nodejs.org/)
- **Git** — [git-scm.com](https://git-scm.com/)
- **Supabase account** — [supabase.com](https://supabase.com/) (free tier works)

---

## 1. Clone the Repository

```bash
git clone <repo-url>
cd TourEase
```

---

## 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# Activate (macOS/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your Supabase URL, keys, and API keys
```

### Run the Backend

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.
Health check: `http://localhost:8000/health`

---

## 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Supabase URL and anon key
```

### Run the Frontend

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 4. Supabase Configuration

1. Create a new project at [supabase.com](https://supabase.com/).
2. Copy the **Project URL** and **anon/public key** from Settings > API.
3. Add them to both:
   - `backend/.env` → `SUPABASE_URL` and `SUPABASE_KEY`
   - `frontend/.env` → `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

---

## 5. Environment Variables Reference

### Backend (`backend/.env`)

| Variable         | Description                        | Required |
|------------------|------------------------------------|----------|
| SUPABASE_URL     | Supabase project URL               | Yes      |
| SUPABASE_KEY     | Supabase anon/public key           | Yes      |
| AI_PROVIDER      | AI provider (`openai` or `gemini`) | Yes      |
| OPENAI_API_KEY   | OpenAI API key                     | If using OpenAI |
| GEMINI_API_KEY   | Gemini API key                     | If using Gemini  |
| MAPS_API_KEY     | Map provider API key               | No       |
| WEATHER_API_KEY  | Weather provider API key           | No       |
| DEBUG            | Enable debug mode                  | No       |
| FRONTEND_URL     | Frontend URL for CORS              | No       |

### Frontend (`frontend/.env`)

| Variable              | Description              | Required |
|-----------------------|--------------------------|----------|
| VITE_SUPABASE_URL     | Supabase project URL     | Yes      |
| VITE_SUPABASE_ANON_KEY| Supabase anon/public key | Yes      |
| VITE_API_BASE_URL     | Backend API URL          | No       |

---

## 6. Project Structure

```
TourEase/
  backend/          Python FastAPI backend
    app/
      main.py       Application entry point
      config.py     Environment config
      routes/       API route handlers
      services/     Business logic & external services
      models/       Data models
      middleware/   Auth, rate limiting, error handling
      utils/        Validators, formatters
      seed/         Demo data scripts
    tests/          Test suites
    .env.example    Environment template

  frontend/         React + TypeScript frontend
    src/
      app/          Pages / routes
      components/   Reusable UI components
      services/     API client, Supabase client
      config/       Environment config, constants
    .env.example    Environment template

  docs/             Project documentation
```
