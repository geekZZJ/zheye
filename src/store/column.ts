import { defineStore } from 'pinia'
import { ColumnProps } from '@/testData'
import axios from 'axios'

interface ColumnsProps {
  columns: ColumnProps[]
}

export const useColumnStore = defineStore('column', {
  state: (): ColumnsProps => ({
    columns: []
  }),
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find((item) => item._id === id)
    }
  },
  actions: {
    async fetchColumns() {
      const result = await axios.get('/columns')
      this.columns = result.data.list
    },
    async fetchColumn(cid: string) {
      const result = await axios.get(`/columns/${cid}`)
      this.columns = [result.data]
    }
  }
})
