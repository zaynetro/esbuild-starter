
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Alias react to preact for compatibility with libraries that depend on react (e.g mobx-react)
 * Ref: https://github.com/evanw/esbuild/issues/266#issuecomment-787212174
 */
const preactCompatPlugin = {
  name: "preact-compat",
  setup(build) {
    const preact = join(__dirname, "node_modules", "preact", "compat", "dist", "compat.module.js");

    build.onResolve({ filter: /^(react-dom|react)$/ }, _args => {
      return { path: preact };
    });
  }
}

export default preactCompatPlugin;
