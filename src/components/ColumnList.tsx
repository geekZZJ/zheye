import { computed, defineComponent, PropType, toRefs } from 'vue'
import { ColumnProps } from '@/testData'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const { list } = toRefs(props)
    const ColumnList = computed(() => {
      return list.value.map((item) => {
        if (!item.avatar) {
          item.avatar = require('@/assets/column.jpg')
        }
        return item
      })
    })

    return () => {
      return (
        <div class="row">
          {ColumnList.value.map((item) => {
            return (
              <div key={item.id} class="col-4 mb-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-body text-center">
                    <img
                      src={item.avatar}
                      alt={item.title}
                      class="rounded-circle border border-light w-25 my-3"
                    />
                    <h5 class="card-title text-left">{item.title}</h5>
                    <p class="card-text">{item.description}</p>
                    <router-link
                      to={`/column/${item.id}`}
                      class="btn btn-outline-primary"
                    >
                      进入专栏
                    </router-link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
})
