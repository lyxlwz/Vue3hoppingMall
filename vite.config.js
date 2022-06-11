import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver, } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    /* ... */
    vue(),
    // your plugin installation
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 配置别名
    alias: {
      '@': '/src/',
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  }
})
