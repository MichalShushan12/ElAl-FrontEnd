import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(tailwindConfig)],
    },
  },
  build: {
    // Ensure this is inside the build configuration
    esbuild: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      }
    }
  }
});
