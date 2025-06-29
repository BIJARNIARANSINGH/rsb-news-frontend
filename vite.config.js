import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: [/\.jsx$/, /\.js$/], // ✅ covers both .js and .jsx files
  },
});