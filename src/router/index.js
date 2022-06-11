import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  { path: '', component: () => import('../views/Home'), name: 'home', },
  { path: '/about', component: () => import('../views/About'), name: 'about', },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router