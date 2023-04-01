import axios from 'axios'
import { useCommonStore } from '@/store/common'

// axios.defaults.baseURL =
//   'http://zhangblog.cn:20080/mock/6421bb3451512e000c945ee0'
axios.defaults.baseURL = 'http://localhost:36742'

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const commonStore = useCommonStore()
    commonStore.setLoading(true)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const commonStore = useCommonStore()
    commonStore.setLoading(false)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const commonStore = useCommonStore()
    commonStore.setLoading(false)
    return Promise.reject(error)
  }
)
