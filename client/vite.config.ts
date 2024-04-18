import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 4000,
        proxy: {
            '/api': {
                target: 'https://voting-system-t1t9.onrender.com',
                changeOrigin: true
            }
        }
    }
});
