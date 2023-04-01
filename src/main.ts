import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'
import router from './router'
import './request/axios'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
