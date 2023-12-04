import { defineStore } from 'pinia'
import { PostProps } from '@/testData'
import axios from 'axios'

interface PostsProps {
  posts: PostProps[]
}

export const usePostStore = defineStore('post', {
  state: (): PostsProps => ({
    posts: []
  }),
  getters: {
    getPostsById: (state) => (id: string) => {
      return state.posts.filter((post) => post.column === id)
    }
  },
  actions: {
    createPost(newPost: PostProps) {
      this.posts.push(newPost)
    },
    async fetchPosts(cid: string) {
      const result = await axios.get(`/columns/${cid}/posts`)
      this.posts.push(...result.data.list)
    },
    async deletePost(cid: string) {
      const result = await axios.delete(`/columns/${cid}/posts`)
      this.posts = this.posts.filter((post) => post._id === result.data._id)
    }
  }
})
