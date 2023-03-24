import { defineStore } from 'pinia'
import { testData, ColumnProps } from '@/testData'

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
    // setName(name: string) {
    //   this.name = name
    // }
  }
})
