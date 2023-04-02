import { defineComponent, reactive } from 'vue'
import ValidateForm from '../components/ValidateForm'
import ValidateInput, { RulesProp } from '../components/ValidateInput'
import axios from 'axios'
import createMessage from '@/components/createMessage'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SignUp',
  props: {},
  setup() {
    const router = useRouter()
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const nameRules: RulesProp = [{ type: 'required', message: '昵称不能为空' }]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validator: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码不相同'
      }
    ]
    const slots = {
      submit: () => (
        <button type="button" class="btn btn-primary btn-block btn-large">
          注册新用户
        </button>
      )
    }

    const onFormSubmit = async (result: boolean) => {
      console.log('测试测试', result)
      if (result) {
        const payload = {
          email: formData.email,
          password: formData.password,
          nickName: formData.nickName
        }
        const result = await axios.post('/users', payload)
        if (result.data._id) {
          createMessage('注册成功，正在跳转登录页面', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }
      }
    }

    return () => {
      return (
        <div class="signup-page mx-auto p-3 w-330">
          <h5 class="my-4 text-center">注册者也账户</h5>
          <ValidateForm v-slots={slots} {...{ onFormSubmit: onFormSubmit }}>
            <div class="mb-3">
              <label class="form-label">邮箱地址</label>
              <ValidateInput
                rules={emailRules}
                v-model={formData.email}
                placeholder="请输入邮箱地址"
                type="text"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">昵称</label>
              <ValidateInput
                rules={nameRules}
                v-model={formData.nickName}
                placeholder="请输入昵称"
                type="text"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">密码</label>
              <ValidateInput
                type="password"
                placeholder="请输入密码"
                rules={passwordRules}
                v-model={formData.password}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">重复密码</label>
              <ValidateInput
                type="password"
                placeholder="请再次密码"
                rules={repeatPasswordRules}
                v-model={formData.repeatPassword}
              />
            </div>
          </ValidateForm>
        </div>
      )
    }
  }
})
