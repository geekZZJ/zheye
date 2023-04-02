import axios from 'axios'
import { defineStore } from 'pinia'

export interface UserProps {
  isLogin: boolean
  nicknName: string
  _id: string
  column: string
  token: string
  email: string
}

export const useUserStore = defineStore('user', {
  state: (): UserProps => ({
    isLogin: false,
    nicknName: '',
    column: '',
    _id: '',
    token: localStorage.getItem('token') || '',
    email: ''
  }),
  getters: {},
  actions: {
    async login(email: string, password: string) {
      const result = await axios.post('/user/login', {
        email,
        password
      })
      const token = result.data.token
      if (token) {
        this.token = token
        localStorage.setItem('token', token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        return true
      } else {
        return false
      }
    },
    async fetchCurrentUser() {
      const result = await axios.get('/user/current')
      console.log(result.data)
      if (result.data._id) {
        this.isLogin = true
        this.nicknName = result.data.nickName
        this._id = result.data._id
        this.column = result.data.column
      }
    }
  }
})
