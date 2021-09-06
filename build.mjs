// Build customer-info project
// Build: `node build.js`

import { build } from 'esbuild';
import { buildOptions } from './build-config.mjs';
import typecheck from './typecheck.mjs';

typecheck({});

build(Object.assign({}, buildOptions, {
  minify: true,
})).catch(() => process.exit(1))
