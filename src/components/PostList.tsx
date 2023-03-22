import { PostProps } from '@/testData'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  },
  setup(props) {
    return () => {
      return (
        <div class="post-list">
          {props.list.map((item) => (
            <article key={item.id} class="card mb-3 shadow-sm">
              <div class="card-body">
                <h4>
                  <router-link to={`/posts/${item.id}/`}>
                    {item.title}
                  </router-link>
                </h4>
                <div class="row my-3 align-items-center">
                  {item.image && (
                    <div class="col-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        class="rounded-lg w-100"
                      />
                    </div>
                  )}
                  <p class={`text-muted ${item.image ? 'col-8' : null}`}>
                    {item.content}
                  </p>
                </div>
                <span class="text-muted">{item.createdAt}</span>
              </div>
            </article>
          ))}
        </div>
      )
    }
  }
})
