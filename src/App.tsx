import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList'
import GlobalHeader, { UserProps } from './components/GlobalHeader'
import ValidateInput, { RulesProp } from './components/ValidateInput'
import ValidateForm from './components/ValidateForm'

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

export default defineComponent({
  name: 'App',
  setup() {
    const inputRef = ref<any>(null)
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
      submit: () => <span class="btn btn-danger">Submit</span>
    }
    const onFormSubmit = (result: boolean) => {
      console.log('测试测试', result)
    }
    return () => {
      return (
        <div class="container">
          <GlobalHeader user={currentUser} />
          <ColumnList list={testData} />
          <ValidateForm v-slots={slots} {...{ onFormSubmit: onFormSubmit }}>
            <div class="mb-3">
              <label class="form-label">邮箱地址</label>
              <ValidateInput
                rules={emailRules}
                v-model={emailVal.value}
                type="text"
                placeholder="请输入邮箱地址"
                ref={inputRef}
              ></ValidateInput>
            </div>
            <div class="mb-3">
              <label class="form-label">密码</label>
              <ValidateInput
                rules={passwordRules}
                v-model={passwordVal.value}
                type="password"
                placeholder="请输入密码"
              ></ValidateInput>
            </div>
          </ValidateForm>
        </div>
      )
    }
  }
})
