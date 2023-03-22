import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App'
import { routes } from './router'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes
})
const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
