import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), svgr()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setup-tests.ts'
    },
    css: {
        devSourcemap: true
    },
    base: './',
    resolve: {
        alias: {
            '@app': 'src/app/index.tsx',
            '@pages': 'src/pages/index.ts',
            '@entities': 'src/entities/index.ts',
            '@shared/*': 'src/shared/*'
        }
    }
});
