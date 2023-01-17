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
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  setup(props, { emit }) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })

    const updateValue = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      emit('update:modelValue', targetValue)
    }

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
            value={inputRef.val}
            onBlur={validateInput}
            onInput={updateValue}
          />
          {inputRef.error && (
            <span class="invalid-feedback ">{inputRef.message}</span>
          )}
        </div>
      )
    }
  }
})
