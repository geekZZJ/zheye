import { defineComponent, toRefs } from 'vue'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  'loading-container': {
    backgroundColor: 'rgba(255, 255, 255, .5)',
    zIndex: 100,
    position: 'fixed',
    top: 0,
    left: 0,
    textAlign: 'center'
  }
})

export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const classesRef = useStyles()
    const { background, text } = toRefs(props)
    return () => {
      const classes = classesRef.value
      return (
        <div
          class={`d-flex justify-content-center align-items-center h-100 w-100 ${classes['loading-container']}`}
          style={{ backgroundColor: background.value }}
        >
          <div class="loading-content">
            <div class="spinner-border text-primary" role="status"></div>
            {text.value && <p class="text-primary small">{text.value}</p>}
          </div>
        </div>
      )
    }
  }
})
