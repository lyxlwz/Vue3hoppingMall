import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    /* ... */
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 配置别名
    alias: {
      '@': '/src/',
    },
  },
})
