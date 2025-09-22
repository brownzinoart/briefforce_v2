# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

**Quick Start:**
```bash
npm run up                    # Complete setup + start both apps
```

**Development:**
```bash
npm run dev                   # Main app (port 3000)
npm run dev:landing           # Landing page (port 3001)
npm run dev:all               # Both apps concurrently
```

**Database:**
```bash
npm run prisma:generate       # Generate Prisma client
npm run prisma:migrate        # Run migrations
```

**Testing & Quality:**
```bash
npm run test:landing          # Jest + RTL tests
npm run lint                  # Lint all workspaces
```

## Architecture

**Monorepo Structure:**
- **Main App** (`apps/main/`): Next.js 14 with Prisma/SQLite
- **Landing Page** (`apps/landing/`): Next.js 15 with Jest testing

**AI Integration:**
- Local Ollama: `qwen2.5:14b-instruct` (primary), `mistral:latest` (fast)
- Environment: `OPENAI_BASE_URL=http://localhost:11434/v1`

**Key Flow:**
```
/intake → /api/briefs → AI generation → /brief/[id]/edit
```

## Critical Requirements

- Ollama server: `ollama serve` with both models installed
- Environment: `.env.example` → `.env` (auto-copied by `npm run up`)
- Database: SQLite (dev) via `apps/main/prisma/schema.prisma`