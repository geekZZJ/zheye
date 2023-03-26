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
    getPostsById: (state) => (id: number) => {
      return state.posts.filter((post) => post.columnId === id)
    }
  },
  actions: {
    createPost(newPost: PostProps) {
      this.posts.push(newPost)
    }
  }
})
