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
    getColumnById: (state) => (id: number) => {
      return state.columns.find((item) => item.id === id)
    }
  },
  actions: {
    async fetchColumns() {
      const result = await axios.get('/columns')
      // this.columns = result.data.list
      this.columns.push(...result.data.list)
    }
  }
})
