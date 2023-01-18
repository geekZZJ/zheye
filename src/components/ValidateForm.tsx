import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup(props, { slots, emit }) {
    const submitForm = () => {
      emit('form-submit', true)
    }
    return () => {
      return <form class="validate-form-container">
        {slots.default?.()}
        <div class="submit-area" onClick={submitForm}>
          {slots.submit ? slots.submit() : <button type='submit' class="btn btn-primary">提交</button>}
        </div>
      </form>
    }
  }
})
