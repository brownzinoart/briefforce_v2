#!/usr/bin/env node
import { existsSync, cpSync, readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';

function run(cmd, args = [], opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', ...opts });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`))));
  });
}

function ensureEnv() {
  if (!existsSync('.env') && existsSync('.env.example')) {
    cpSync('.env.example', '.env');
    console.log('Created .env from .env.example');
  }
}

function parseEnv() {
  try {
    const raw = readFileSync('.env', 'utf8');
    const obj = Object.fromEntries(
      raw
        .split(/\r?\n/)
        .filter((l) => l && !l.trim().startsWith('#') && l.includes('='))
        .map((l) => {
          const i = l.indexOf('=');
          const k = l.slice(0, i).trim();
          let v = l.slice(i + 1).trim();
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
          return [k, v];
        })
    );
    return obj;
  } catch {
    return {};
  }
}

async function checkOllama(baseUrl) {
  try {
    const url = new URL(baseUrl || 'http://localhost:11434/v1');
    const root = `${url.origin}/v1/models`;
    const res = await fetch(root, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.log('✓ Ollama API reachable:', root);
  } catch (e) {
    console.warn('! Ollama API not reachable. Ensure `ollama serve` is running.');
  }
}

async function ensureDeps() {
  if (!existsSync('node_modules/next')) {
    console.log('Installing dependencies...');
    await run('npm', ['i']);
  }
}

async function prismaSetup() {
  await run('npx', ['prisma', 'generate']);
  const hasMigrations = existsSync('prisma/migrations') && readdirSync('prisma/migrations').length > 0;
  if (hasMigrations) {
    await run('npx', ['prisma', 'migrate', 'dev']);
  } else {
    await run('npx', ['prisma', 'migrate', 'dev', '--name', 'init']);
  }
}

async function main() {
  ensureEnv();
  const env = parseEnv();
  await ensureDeps();
  await prismaSetup();
  await checkOllama(env.OPENAI_BASE_URL || 'http://localhost:11434/v1');
  console.log('Starting Next.js dev server...');
  await run('npm', ['run', 'dev']);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

