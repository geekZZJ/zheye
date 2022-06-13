import { defineComponent, PropType } from 'vue'
import IDropDown from './IDropdown'

export interface UserProps {
  isLogin: boolean
  name: string
  id?: number
}

export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup(props) {
    return () => {
      return (
        <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
          <a href="#" class="navbar-brand">
            者也
          </a>
          {/* eslint-disable-next-line */}
          {!props.user.isLogin ? (
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <a href="#" class="btn btn-outline-light my-2">
                  登陆
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="btn btn-outline-light my-2">
                  注册
                </a>
              </li>
            </ul>
          ) : (
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <IDropDown title={props.user.name}></IDropDown>
              </li>
            </ul>
          )}
        </nav>
      )
    }
  }
})
