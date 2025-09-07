import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration tailored for deploying a static React site to Netlify or Vercel.
export default defineConfig({
  plugins: [react()],
  // Uncomment the following build options if you need to serve the site from a subfolder
  // build: {
  //   outDir: 'dist',
  // },
});