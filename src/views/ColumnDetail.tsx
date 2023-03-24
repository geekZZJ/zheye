import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList'
import { useColumnStore } from '@/store/column'
import { usePostStore } from '@/store/post'

export default defineComponent({
  props: {},
  setup() {
    const columnStore = useColumnStore()
    const postStore = usePostStore()
    const { columns } = columnStore
    const { posts } = postStore
    const route = useRoute()
    const currentId = +route.params.id
    const column = columns.find((item) => item.id === currentId)
    const list = posts.filter((post) => post.columnId === currentId)

    return () => {
      return (
        <div class="column-detail-page w-75 mx-auto">
          {column && (
            <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
              <div class="col-3 text-center">
                <img
                  src={column.avatar}
                  alt={column.title}
                  class="rounded-circle border w-100"
                />
              </div>
              <div class="col-9">
                <h4>{column.title}</h4>
                <p class="text-muted">{column.description}</p>
              </div>
            </div>
          )}
          <PostList list={list}></PostList>
        </div>
      )
    }
  }
})
