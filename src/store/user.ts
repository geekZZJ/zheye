import { defineStore } from 'pinia'

interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}

export const useUserStore = defineStore('user', {
  state: (): UserProps => ({
    isLogin: false
  }),
  getters: {
    // getUserName: (state) => state.name
  },
  actions: {
    // setName(name: string) {
    //   this.name = name
    // }
  }
})
