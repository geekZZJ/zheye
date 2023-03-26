import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Column from '@/views/ColumnDetail'
import CreatePost from '@/views/CreatePost'
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/column/:id',
    name: 'column',
    component: Column
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost
  }
]

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { isLogin } = userStore
  if (to.name !== 'login' && !isLogin) {
    next('/login')
  } else {
    next()
  }
})

export default router
