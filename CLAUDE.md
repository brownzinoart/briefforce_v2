# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

**Quick Start:**
```bash
npm run up                    # Setup + start main app
```

**Main App:**
```bash
npm run dev                   # Development server
npm run prisma:generate       # Generate Prisma client
npm run prisma:migrate        # Database migrations
```

**Landing Page (briefforce-landing/):**
```bash
npm run dev                   # Development server
npm run test                  # Jest tests
npm run test:watch           # TDD workflow
```

## Architecture

**Dual-App Structure:**
- **Main App** (root): Next.js 14 brief creation/editing with Prisma/SQLite
- **Landing Page** (`briefforce-landing/`): Next.js 15 marketing site with testing

**AI Integration:**
- Local Ollama server required: `qwen2.5:14b-instruct` (primary), `mistral:latest` (fast)
- Environment: `OPENAI_BASE_URL=http://localhost:11434/v1`

**Data Flow:**
```
/intake → /api/briefs → AI generation → /brief/[id]/edit → versioning
```

**Key Routes:**
- `/intake` - Form to create brief
- `/brief/[id]/edit` - Section editing with AI regeneration
- `/api/briefs/[id]/regenerate` - Fast model regeneration

## Critical Requirements

- Ollama server must be running with both models
- Copy `.env.example` to `.env` before development
- Landing page uses TDD with Jest/React Testing Library
- Database: SQLite (dev) → Postgres (production) via schema.prisma