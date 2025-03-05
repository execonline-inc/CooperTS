// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Assuming your main entry point is src/index.ts
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true, // Generate .d.ts files
  format: ['cjs', 'esm'], // Generate both CommonJS and ES modules
  outDir: 'lib', // Output directory
  target: 'es2017', // target ecmascript version
  minify: true, // Enable minification for production builds
  skipNodeModulesBundle: true,
  bundle: true,
});
