import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Column from '@/views/ColumnDetail'
import CreatePost from '@/views/CreatePost'
import SignUp from '@/views/SignUp'
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
    component: Login,
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/column/:id',
    name: 'column',
    component: Column
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost,
    meta: {
      requiredLogin: true
    }
  }
]

const routerHistory = createWebHashHistory()
const router = createRouter({
  history: routerHistory,
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { isLogin } = userStore
  if (to.meta.requiredLogin && !isLogin) {
    next('/login')
  } else if (to.meta.redirectAlreadyLogin && isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
