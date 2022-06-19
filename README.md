# Vue3hoppingMall
基于b站 老陈打码 Vue3+threejs 沉浸式商城企业项目实战

> 使用Vue 3.2.25

## 相关笔记地址
### Github
https://github.com/lyxlwz/vue3-three.js
### Gitee
https://gitee.com/alicloud_75/vue3-three.js

## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


## 创建项目
### 使用Vite脚手架 创建项目以及安装 路由和 状态管理
#### Vite脚手架 创建项目
```shell
# npm 6.x
$ npm init vite@latest <project-name> --template vue

# npm 7+，需要加上额外的双短横线
$ npm init vite@latest <project-name> -- --template vue
```
#### 安装路由
```shell
npm install vue-router@4
```
#### 安装状态管理
```shell
npm install vuex@next --save
```

## AntDesing 组件库

### 安装AntDesing 组件库
```shell
$ npm i --save ant-design-vue
```

### 注册组件
> 如果使用 Vue 默认的模板语法，需要注册组件后方可使用，有如下两种方式常用注册组件：
> 
> 还有一种 局部注册 不推荐就不写了


#### 在 main.js 全局完整注册
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

let app = createApp(App)
app.use(router)
app.use(store)

//ant-design 全局完整注册
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
app.use(Antd)

app.mount('#app')
```
> **以上代码便完成了 Antd 的全局注册。需要注意的是，样式文件需要单独引入。**


#### 在 main.js 全局部分注册（按需加载）
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

let app = createApp(App)
app.use(router)
app.use(store)

/**
 * ant-design 按需加载
 * 
 * 需要使用 按需加载的插件 来进行按需加载
 * 
 * Vue-cli 使用babel-plugin-import
 * Vite 使用 unplugin-vue-components 
 */
//不使用
// import Button from 'ant-design-vue/lib/button';
// import 'ant-design-vue/lib/button/style'; // 或者 ant-design-vue/lib/button/style/css 加载 css 文件

// 使用
import { Button, message } from 'ant-design-vue';
/* 会自动注册 Button 下的子组件, 例如 Button.Group */
import 'ant-design-vue/es/message/style/css'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
app.use(Button)
app.config.globalProperties.$message = message;

app.mount('#app')
```

##### Vite 安装按需加载插件 unplugin-vue-components
```shell
$ npm install unplugin-vue-components -D
```

##### 修改 vite.config.js
```javascript
// vite.config.js
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
})
```
##### 使用组件 就不写了 （直接使用无需在任何地方导入组件）
**第一次加载完成控制台会出现**
```shell
[vite] new dependencies found: ant-design-vue/es, ant-design-vue/es/button/style/css, updating...
[vite] ✨ dependencies updated, reloading page...
```

## 使用less

### 安装 less
```shell
$ npm i less-loader less --save-dev
```

### 修改 vite.config.js
```javascript
...

// https://vitejs.dev/config/
export default defineConfig({
  ...
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
```

### 使用就不写了

## git提交遇到的问题commit的文件大于100MB
> 链接 https://docs.github.com/cn/repositories/working-with-files/managing-large-files/about-large-files-on-github
> 根据 安装--> 配置
