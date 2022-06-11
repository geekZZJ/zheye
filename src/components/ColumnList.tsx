import { defineComponent, PropType } from 'vue'

export interface ColumnProps {
  id: number
  title: string
  avatar: string
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
    return () => {
      return (
        <ul>
          {props.list.map((item) => {
            return (
              <li key={item.id}>
                <img src={item.avatar} alt={item.title} />
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
                <a href="#">进入专栏</a>
              </li>
            )
          })}
        </ul>
      )
    }
  }
})
