import { defineComponent, PropType } from 'vue'
import IDropDown from './IDropdown'
import DropdownItem from './DropdownItem'
import { UserProps } from '@/store/user'

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
          <router-link to="/" class="navbar-brand">
            者也
          </router-link>
          {!props.user.isLogin ? (
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <router-link to="/login" class="btn btn-outline-light my-2">
                  登陆
                </router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/signup" class="btn btn-outline-light my-2">
                  注册
                </router-link>
              </li>
            </ul>
          ) : (
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <IDropDown title={props.user.nicknName}>
                  <DropdownItem>
                    <router-link to="/create" class="dropdown-item">
                      新建文章
                    </router-link>
                  </DropdownItem>
                  <DropdownItem disabled>
                    <a href="#" class="dropdown-item">
                      编辑资料
                    </a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href="#" class="dropdown-item">
                      退出登陆
                    </a>
                  </DropdownItem>
                </IDropDown>
              </li>
            </ul>
          )}
        </nav>
      )
    }
  }
})
