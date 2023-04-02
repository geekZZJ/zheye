import { defineStore } from 'pinia'

interface GlobalErrorProps {
  status: boolean
  message?: string
}

interface CommonProps {
  loading: boolean
  error: GlobalErrorProps
}

export const useCommonStore = defineStore('common', {
  state: (): CommonProps => ({
    loading: false,
    error: { status: false }
  }),
  getters: {},
  actions: {
    setLoading(status: boolean) {
      this.loading = status
    },
    setError(e: GlobalErrorProps) {
      this.error = e
    }
  }
})
