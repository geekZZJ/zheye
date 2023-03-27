import { defineStore } from 'pinia'
import { testData, ColumnProps } from '@/testData'
import axios from 'axios'

interface ColumnsProps {
  columns: ColumnProps[]
}

export const useColumnStore = defineStore('column', {
  state: (): ColumnsProps => ({
    columns: testData
  }),
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find((item) => item.id === id)
    }
  },
  actions: {
    async fetchColumns() {
      const result = await axios.get('/columns')
      // this.columns = result.data.data.list
      console.log('33333', result)
    }
  }
})
