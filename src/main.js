import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

let app = createApp(App)
app.use(router)
app.use(store)

// ant-design 按需加载
import { Button, message } from 'ant-design-vue';
/* 会自动注册 Button 下的子组件, 例如 Button.Group */
import 'ant-design-vue/es/message/style/css'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib
app.use(Button)
app.config.globalProperties.$message = message;

app.mount('#app')
