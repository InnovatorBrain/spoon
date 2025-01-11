import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  build: {
    outDir: 'build',
    assetsDir: 'static', // Place static files in a `static` folder inside the build folder
  },
});

