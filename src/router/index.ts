import Home from '@/views/Home'
import Login from '@/views/Login'
import Column from '@/views/ColumnDetail'

export const routes = [
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
  }
]
