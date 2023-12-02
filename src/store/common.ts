import { defineStore } from 'pinia'

interface GlobalErrorProps {
  status: boolean
  message: string
}

interface CommonProps {
  loading: boolean
  error: GlobalErrorProps
}

export interface ResponseType<P> {
  code: number
  msg: string
  data: P
}

export const useCommonStore = defineStore('common', {
  state: (): CommonProps => ({
    loading: false,
    error: { status: false, message: '' }
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
