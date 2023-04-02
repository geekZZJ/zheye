import { PropType, Teleport, defineComponent, ref } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'

type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  name: 'MessageView',
  props: {
    message: {
      type: String,
      default: '网络错误'
    },
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup(props, { emit }) {
    useDOMCreate('message')
    const isVisible = ref(true)
    const alertClass = () => {
      const { type } = props
      switch (type) {
        case 'success':
          return 'alert-success'
        case 'error':
          return 'alert-danger'
        default:
          return 'alert-primary'
      }
    }
    const hide = (e: MouseEvent) => {
      e.preventDefault()
      isVisible.value = false
      emit('close-message', true)
    }

    return () => {
      return (
        <Teleport to="#message">
          {isVisible.value && (
            <div
              class={`alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2 ${alertClass()}`}
            >
              <span>{props.message}</span>
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                onClick={(e) => hide(e)}
              ></button>
            </div>
          )}
        </Teleport>
      )
    }
  }
})
