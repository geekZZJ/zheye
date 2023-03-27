import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL =
  'http://zhangblog.cn:20080/mock/6421bb3451512e000c945ee0'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
