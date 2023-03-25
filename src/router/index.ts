import Home from '@/views/Home'
import Login from '@/views/Login'
import Column from '@/views/ColumnDetail'
import CreatePost from '@/views/CreatePost'

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
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost
  }
]
