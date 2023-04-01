import { defineStore } from 'pinia'

interface CommonProps {
  loading: boolean
}

export const useCommonStore = defineStore('common', {
  state: (): CommonProps => ({
    loading: false
  }),
  getters: {},
  actions: {
    setLoading(status: boolean) {
      this.loading = status
    }
  }
})
