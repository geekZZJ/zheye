import { defineStore } from 'pinia'

interface State {
  token: string
  userInfo: any
}

export const GlobalStore = defineStore({
  id: 'GlobalState', // id: 必须的，在所有 Store 中唯一
  // state: 返回对象的函数
  state: (): State => ({
    token: '',
    userInfo: {}
  }),
  getters: {},
  actions: {
    // 不使用箭头函数
    setToken(token: string) {
      this.token = token
    },
    setUserIngo(userInfo: any) {
      this.userInfo = userInfo
    }
  }
})
