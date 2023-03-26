import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm'

interface RuleProp {
  type: 'required' | 'email'
  message: string
}

export type RulesProp = RuleProp[]
type TagType = 'input' | 'textarea'

const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    type: String,
    placeholder: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    },
    rows: String
  },
  inheritAttrs: false,
  setup(props, { emit, expose }) {
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
        return allPassed
      }
      return true
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    expose({
      validateInput
    })

    return () => {
      return (
        <div class="validate-input-container pb-3">
          {props.tag === 'input' ? (
            <input
              class={`form-control ${inputRef.error ? 'is-invalid' : ''}`}
              value={inputRef.val}
              onBlur={validateInput}
              onInput={updateValue}
              type={props.type}
              placeholder={props.placeholder}
            />
          ) : (
            <textarea
              class={`form-control ${inputRef.error ? 'is-invalid' : ''}`}
              value={inputRef.val}
              onBlur={validateInput}
              onInput={updateValue}
              placeholder={props.placeholder}
              rows={props.rows}
            />
          )}
          {inputRef.error && (
            <span class="invalid-feedback">{inputRef.message}</span>
          )}
        </div>
      )
    }
  }
})
