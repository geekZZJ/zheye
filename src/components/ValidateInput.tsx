import { defineComponent, PropType, reactive } from 'vue'

interface RuleProp {
  type: 'required' | 'email'
  message: string
}

export type RulesProp = RuleProp[]

const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>
  },
  setup(props) {
    const inputRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break

            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
      }
    }

    return () => {
      return (
        <div class="validate-input-container pb-3">
          <input
            type="text"
            class={`form-control ${inputRef.error ? 'is-invalid' : ''}`}
            v-model={inputRef.val}
            onBlur={validateInput}
          />
          {inputRef.error && (
            <span class="invalid-feedback ">{inputRef.message}</span>
          )}
        </div>
      )
    }
  }
})
