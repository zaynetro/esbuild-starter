// Serve customer-info project locally (for development purposes only!)
// This file starts a server on port 3333.
// It then forwards /api/ requests to http://localhost:8080
// and other requests to esbuild to serve the files.
// Serve: `node serve.js`

import { createServer, request } from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { serve } from 'esbuild';

import { buildOptions } from './build-config.mjs';
import typecheck from './typecheck.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

typecheck({ watch: true });

// Start esbuild's server on a random local port
serve({
  servedir: resolve(__dirname, 'www'),
  host: '127.0.0.1',
}, Object.assign({}, buildOptions, {
  outdir: 'www/js',
})).then(result => {
  const serverPort = 3333;
  console.log('Starting a server on http://localhost:' + serverPort);

  // The result tells us where esbuild's local server is
  const { host, port } = result;

  createServer((req, res) => {
    const esbuildProxyOptions = {
      hostname: host,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const apiProxyOptions = {
      port: 8080,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    if (req.url.startsWith('/api/')) {
      console.log('Proxying', req.url, 'to API server');
      const proxyReq = request(apiProxyOptions, proxyRes => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      req.pipe(proxyReq, { end: true });
    } else {
      // Proxy to esbuild to serve files
      const proxyReq = request(esbuildProxyOptions, proxyRes => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      req.pipe(proxyReq, { end: true });
    }

  }).listen(serverPort);
});
