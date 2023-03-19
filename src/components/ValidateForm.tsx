import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type Events = {
  'form-item-created': string
}

export const emitter = mitt<Events>()

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup(props, { slots, emit }) {
    const submitForm = () => {
      emit('form-submit', true)
    }
    const callback = (test: string) => {
      console.log(test)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
    })
    return () => {
      return (
        <form class="validate-form-container">
          {slots.default?.()}
          <div class="submit-area" onClick={submitForm}>
            {slots.submit ? (
              slots.submit()
            ) : (
              <button type="submit" class="btn btn-primary">
                提交
              </button>
            )}
          </div>
        </form>
      )
    }
  }
})
