import path from 'path'

import {tanstackRouter} from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import {defineConfig, loadEnv} from 'vite'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')

    // config.ts와 동일한 로직 사용
    const basepath = env.VITE_BASE_PATH || '/'

    return {
        base: basepath,
        plugins: [
            // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
            tanstackRouter({
                target: 'react',
                autoCodeSplitting: true,
            }),
            react({
                babel: {
                    plugins: [['babel-plugin-react-compiler']],
                },
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@config': path.resolve(__dirname, './config.ts'),
            },
        },
    }
})
