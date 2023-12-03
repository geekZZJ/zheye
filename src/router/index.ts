import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
import axios from 'axios'
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Column = () => import('@/views/ColumnDetail')
const CreatePost = () => import('@/views/CreatePost')
const SignUp = () => import('@/views/SignUp')

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
  const { token, isLogin } = userStore
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      userStore
        .fetchCurrentUser()
        .then((res) => {
          console.log(res)
          if (redirectAlreadyLogin) next('/')
          else next()
        })
        .catch((e) => {
          console.error(e)
          userStore.logout()
          next('login')
        })
    } else {
      if (requiredLogin) next('login')
      else next()
    }
  } else {
    if (redirectAlreadyLogin) next('/')
    else next()
  }
})

export default router
