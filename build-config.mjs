/**
 * Esbuild configuration.
 */

import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';
// You need this only if using preact.
import preactCompatPlugin from './preact-compat.mjs';

export const buildOptions = {
  entryPoints: [
    './src/index.tsx',
  ],
  loader: {
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.svg': 'dataurl',
  },
  define: {
    // Some libs depend on `global` variable.
    global: 'globalThis',
  },
  bundle: true,
  sourcemap: true,
  target: 'es6',
  logLevel: 'info',
  outdir: './dist',
  plugins: [sassPlugin({
    exclude: /\.css$/,
    type: 'style',
    transform: postcssModules({})
  }), preactCompatPlugin],
};
