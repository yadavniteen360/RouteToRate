import { spawn } from 'child_process';
import process from 'process';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  bold: '\x1b[1m'
};

function runService(name, command, args, cwd, color) {
  const isWindows = process.platform === 'win32';
  const child = spawn(isWindows ? `${command}.cmd` : command, args, {
    cwd,
    stdio: 'pipe',
    shell: true
  });

  child.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    for (const line of lines) {
      if (line.trim()) {
        console.log(`${color}[${name}]${colors.reset} ${line}`);
      }
    }
  });

  child.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    for (const line of lines) {
      if (line.trim()) {
        console.error(`${color}[${name}]${colors.reset} ${line}`);
      }
    }
  });

  return child;
}

console.log(`${colors.bold}${colors.green}🌾 Starting KisanApp Full-Stack Development Environment...${colors.reset}\n`);

const backend = runService('Backend', 'npm', ['run', 'dev'], './backend', colors.cyan);
const frontend = runService('Frontend', 'npm', ['run', 'dev'], './frontend', colors.yellow);

function cleanup() {
  console.log(`\n${colors.bold}Shutting down services...${colors.reset}`);
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
