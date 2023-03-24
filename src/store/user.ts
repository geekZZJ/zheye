import { defineStore } from 'pinia'

interface UserProps {
  isLogin: boolean
  name: string
  id?: number
}

export const useUserStore = defineStore('user', {
  state: (): UserProps => ({
    isLogin: false,
    name: ''
  }),
  getters: {
    // getUserName: (state) => state.name
  },
  actions: {
    login(state:boolean) {
      this.isLogin = state
      this.name = 'zzj'
    }
  }
})
