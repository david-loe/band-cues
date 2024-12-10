import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default {
  plugins: [vue()],
  server: { port: 8080, strictPort: true, host: '0.0.0.0' },
  preview: { port: 8080, host: '0.0.0.0' },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
}
