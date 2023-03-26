import { defineStore } from 'pinia'

interface UserProps {
  isLogin: boolean
  name: string
  id?: number
  columnId: number
}

export const useUserStore = defineStore('user', {
  state: (): UserProps => ({
    isLogin: true,
    name: '年少轻狂',
    columnId: 1
  }),
  getters: {},
  actions: {
    login(state: boolean) {
      this.isLogin = state
      this.name = 'zzj'
    }
  }
})
