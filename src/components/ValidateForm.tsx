import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type ValidateFunc = () => boolean
type Events = {
  'form-item-created': ValidateFunc
}

export const emitter = mitt<Events>()

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup(props, { slots, emit }) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((item) => item)
      emit('form-submit', result)
    }
    const callback = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
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
