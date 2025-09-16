# BriefForce Project Overview

## Project Purpose
BriefForce is an AI-powered briefing tool designed to optimize the briefing process for marketing and creative teams. The main application helps users create, edit, and manage project briefs using AI assistance.

## Architecture
- **Main Application**: Full-stack Next.js app (root directory) with Prisma/SQLite database
- **Landing Page**: Separate Next.js 15 app in `/briefforce-landing/` directory 
- **AI Integration**: Uses Ollama with qwen2.5:14b-instruct and mistral:latest models

## Key Features
- AI-powered brief generation from intake forms
- Section-by-section editing with regeneration capabilities
- Brief preview and markdown export
- Marketing landing page with conversion-optimized design

## Tech Stack
### Main App
- Next.js 14 with React 18
- TypeScript
- Prisma ORM with SQLite (dev) / Postgres (production)
- Tailwind CSS
- OpenAI API (pointing to local Ollama)

### Landing Page
- Next.js 15 with React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion for animations
- shadcn/ui component library
- Jest + React Testing Library for testing

## Development Environment
- Platform: Darwin (macOS)
- Local AI: Ollama with specified models
- Database: SQLite for development

## Key Directories
- `/app/` - Main application routes and API
- `/briefforce-landing/` - Separate landing page application  
- `/prisma/` - Database schema and migrations
- `/lib/` - Shared utilities and LLM integration
- `/docs/` - Project documentation