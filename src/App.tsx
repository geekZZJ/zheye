import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList'
import GlobalHeader, { UserProps } from './components/GlobalHeader'

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
    return () => {
      return (
        <div class="container">
          <GlobalHeader user={currentUser} />
          <ColumnList list={testData} />
        </div>
      )
    }
  }
})
