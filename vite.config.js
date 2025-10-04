import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // важно для Docker
    port: 5173, // порт, который ты expose в Docker
    hmr: {
      host: 'localhost', // для WebSocket HMR
      protocol: 'wss', // https через Nginx
    },
  },
});
