import { defineComponent, reactive } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList'
import GlobalHeader, { UserProps } from './components/GlobalHeader'
import ValidateInput, { RulesProp } from './components/ValidateInput'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    desc: 'test1的专栏描述',
    avatar: 'https://avatars0.githubusercontent.com/u/8186664?s=460&v=4'
  },
  {
    id: 2,
    title: 'test2的专栏',
    desc: 'test2的专栏描述'
    // avatar: 'https://avatars0.githubusercontent.com/u/8186664?s=460&v=4'
  },
  {
    id: 3,
    title: 'test3的专栏',
    desc: 'test3的专栏描述',
    avatar: 'https://avatars0.githubusercontent.com/u/8186664?s=460&v=4'
  },
  {
    id: 4,
    title: 'test4的专栏',
    desc: 'test4的专栏描述',
    avatar: 'https://avatars0.githubusercontent.com/u/8186664?s=460&v=4'
  }
]

const currentUser: UserProps = {
  isLogin: true,
  name: '者也'
}

const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export default defineComponent({
  name: 'App',
  setup() {
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = '请输入邮箱'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = '邮箱格式不正确'
      } else {
        emailRef.error = false
        emailRef.message = ''
      }
    }
    return () => {
      return (
        <div class="container">
          <GlobalHeader user={currentUser} />
          <ColumnList list={testData} />
          <form>
            <div class="mb-3">
              <label class="form-label">邮箱地址</label>
              <ValidateInput rules={emailRules}></ValidateInput>
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                邮箱地址
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                v-model={emailRef.val}
                onBlur={validateEmail}
              />
              {/* eslint-disable-next-line */}
              {emailRef.error ? (
                <div class="form-text">{emailRef.message}</div>
              ) : null}
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                密码
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </form>
        </div>
      )
    }
  }
})
