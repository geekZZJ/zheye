import { defineStore } from 'pinia'
import { PostProps, testPosts } from '@/testData'

interface PostsProps {
  posts: PostProps[]
}

export const usePostStore = defineStore('post', {
  state: (): PostsProps => ({
    posts: testPosts
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
