import { computed, defineComponent, PropType, toRefs } from 'vue'
import { ColumnProps } from '@/testData'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  img50: {
    width: '50px',
    height: '50px'
  }
})

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const classesRef = useStyles()
    const { list } = toRefs(props)
    const ColumnList = computed(() => {
      return list.value.map((item) => {
        if (!item.avatar) {
          item.avatar = {
            url: require('@/assets/column.jpg')
          }
        } else {
          item.avatar.url =
            item.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
        }
        return item
      })
    })

    return () => {
      const classes = classesRef.value
      return (
        <div class="row">
          {ColumnList.value.map((item) => {
            return (
              <div key={item._id} class="col-4 mb-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-body text-center">
                    <img
                      src={item.avatar?.url}
                      alt={item.title}
                      class={`rounded-circle border border-light my-3 ${classes.img50}`}
                    />
                    <h5 class="card-title text-left">{item.title}</h5>
                    <p class="card-text">{item.description}</p>
                    <router-link
                      to={`/column/${item._id}`}
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
