import { defineComponent, ref } from 'vue'
import ValidateForm from '../components/ValidateForm'
import ValidateInput, { RulesProp } from '../components/ValidateInput'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginView',
  props: {},
  setup() {
    const router = useRouter()
    const inputRef = ref<unknown>(null)
    const emailVal = ref('')
    const passwordVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const slots = {
      submit: () => (
        <button type="button" class="btn btn-primary btn-block btn-large">
          登录
        </button>
      )
    }
    const onFormSubmit = (result: boolean) => {
      console.log('测试测试', result)
      if (result) {
        router.push('column/1')
      }
    }

    return () => {
      return (
        <div class="login-page mx-auto p-3 w-330">
          <h5 class="my-4 text-center">登录到者也</h5>
          <ValidateForm v-slots={slots} {...{ onFormSubmit: onFormSubmit }}>
            <div class="mb-3">
              <label class="form-label">邮箱地址</label>
              <ValidateInput
                placeholder="请输入邮箱地址"
                type="text"
                rules={emailRules}
                v-model={emailVal.value}
                ref={inputRef}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">密码</label>
              <ValidateInput
                type="password"
                placeholder="请输入密码"
                rules={passwordRules}
                v-model={passwordVal.value}
              />
            </div>
          </ValidateForm>
        </div>
      )
    }
  }
})
