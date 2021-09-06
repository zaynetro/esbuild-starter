
import { join } from 'path';
import { spawn } from 'child_process';

/**
 * Run typescript to type check the project.
 * Esbuild doesn't do any type checking hence we need to run it ourselves.
 */
export default function typecheck({ watch }) {
  const args = ['--noEmit'];
  if (watch) {
    args.push('--watch');
  }

  const ts = spawn(join('node_modules', '.bin', 'tsc'), args);

  ts.stdout.on('data', (data) => {
    console.log('[typescript] ' + data);
  });

  ts.stderr.on('data', (data) => {
    console.error('[typescript] ' + data);
  });

  ts.on('close', (code) => {
    if (code === 0) {
      console.log('[typescript] types checked.');
    } else {
      console.error('[typescript] process exited with:', code);
    }
    process.exit(code);
  });
}
