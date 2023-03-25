import { defineStore } from 'pinia'

interface UserProps {
  isLogin: boolean
  name: string
  id?: number
}

export const useUserStore = defineStore('user', {
  state: (): UserProps => ({
    isLogin: true,
    name: '年少轻狂'
  }),
  getters: {},
  actions: {
    login(state: boolean) {
      this.isLogin = state
      this.name = 'zzj'
    }
  }
})
