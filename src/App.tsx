import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    return () => {
      return <img alt="Vue logo" src="./assets/logo.png" />
    }
  }
})
