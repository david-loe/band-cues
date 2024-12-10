import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    server: { port: 8080, strictPort: true, host: '0.0.0.0' },
    preview: { port: 8080, host: '0.0.0.0' },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    base: mode === 'production' ? '/band-cues/' : '/'
  }
})
