import { defineStore } from 'pinia'

interface UserState {
  name:string,
  gender:string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    gender: ''
  }),
  getters: {
    getUserName: (state) => state.name
  },
  actions: {
    setName(name:string) {
      this.name = name
    }
  }
})
