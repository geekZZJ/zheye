import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: {},
  setup() {
    const route = useRoute()
    console.log(2222, route)
    return () => {
      return <div>1111</div>
    }
  }
})
