import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList'
import { useColumnStore } from '@/store/column'
import { usePostStore } from '@/store/post'

export default defineComponent({
  props: {},
  setup() {
    const columnStore = useColumnStore()
    const postStore = usePostStore()
    const { getColumnById } = columnStore
    const { getPostsById } = postStore
    const route = useRoute()
    const currentId = route.params.id + ''

    onMounted(() => {
      columnStore.fetchColumn(currentId)
      postStore.fetchPosts(currentId)
    })
    const column = computed(() => getColumnById(currentId))
    const list = computed(() => getPostsById(currentId))

    return () => {
      return (
        <div class="column-detail-page w-75 mx-auto">
          {column.value && (
            <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
              <div class="col-3 text-center">
                <img
                  src={column.value.avatar.url}
                  alt={column.value.title}
                  class="rounded-circle border w-100"
                />
              </div>
              <div class="col-9">
                <h4>{column.value.title}</h4>
                <p class="text-muted">{column.value.description}</p>
              </div>
            </div>
          )}
          <PostList list={list.value}></PostList>
        </div>
      )
    }
  }
})
