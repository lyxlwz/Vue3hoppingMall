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

## Threejs

### 安装threejs
```shell
$ npm i three --save
```

### 使用threejs
> .hdr 文件 三维图 是可调节光亮（对比度，曝光等等）的显示的更加逼真


#### 创建场景（背景）

##### 在utils里创建base.js文件
```javascript
// 1.引入threejs
import * as THREE from "three";
//2. 引入RGBELoader 加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

// 3.构建需要的3d的类
class Base3d {
  constructor(selector) {
    this.container = document.querySelector(selector); //场景中创建的物体
    this.camera; //照相机（Camera）
    this.scene; //场景（Scene）
    this.renderer; //渲染器（Renderer）

    //初始化
    this.init()
    // 渲染界面
    this.animate()
  }

  init() {
    this.initScene(); //初始化场景
    this.initCamera(); //初始化照相机
    this.initRenderer(); //初始化渲染器
  }
  initScene() {
    this.scene = new THREE.Scene(); //初始化场景
    this.setEnvMap('000'); //初始化场景的背景
  }
  initCamera() {
    /**
     * PerspectiveCamera 透视相机
     * 
     * 第一个参数为 角度 例如 45 45°
     * 第二个参数为 摄像头的宽高比例 
     * 第三个参数为 最近的距离为多少
     * 第四个参数为 最远的距离为多少
     */
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      200
    )

    // 设置摄像机的位置 (参数为三位坐标)
    this.camera.position.set(-1.8, 0.6, 2.7)
  }
  initRenderer() {
    /**
     * 初始化渲染器
     * 
     * antialias 表示抗锯齿 指模型的圆润程度
     */
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    //设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // 渲染的尺寸大小
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // 渲染的画面挂载到元素上
    console.log(this.container);
    this.container.appendChild(this.renderer.domElement);
  }

  //设置场景的背景
  setEnvMap(hdr) {
    new RGBELoader().setPath("./files/hdr/").load(hdr + ".hdr", (texture) => {
      /**
       * 纹理的映射
       * 
       * EquirectangularReflectionMapping 圆柱映射
       */
      texture.mapping = THREE.EquirectangularReflectionMapping;
      // 加载纹理对象
      this.scene.background = texture;
      this.scene.environment = texture;
    })
  }

  // 渲染界面 
  render() {
    this.renderer.render(this.scene, this.camera)
  }
  //渲染帧
  animate() {
    this.renderer.setAnimationLoop(this.render.bind(this))
  }
}

export default Base3d
```

#### 使用场景
```vue
<template>
  <div class="scene" id="scene">

  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import Base3d from '@/utils/Base3d';

const data = reactive({
  base3d: {}
})

onMounted(() => {
  data.base3d = new Base3d("#scene")
})
</script>
<style lang='less' scoped>
</style>
```
