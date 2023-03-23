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
    // getUserName: (state) => state.name
  },
  actions: {
    // setName(name: string) {
    //   this.name = name
    // }
  }
})
