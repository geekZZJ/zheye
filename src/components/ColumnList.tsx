import { computed, defineComponent, PropType } from 'vue'

export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  desc: string
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const ColumnList = computed(() => {
      return props.list.map((item) => {
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
                    <p class="card-text">{item.desc}</p>
                    <a href="#" class="btn btn-outline-primary">
                      进入专栏
                    </a>
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
