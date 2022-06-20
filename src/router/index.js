import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  { path: '', component: () => import('../views/Home'), name: 'home', },
  { path: '/product', component: () => import('../views/Product'), name: 'product', },
  { path: '/scene', component: () => import('../views/Scene'), name: 'scene', },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router