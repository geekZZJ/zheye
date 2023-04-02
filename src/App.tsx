import { computed, defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader'
import { useUserStore } from '@/store/user'
import { useCommonStore } from './store/common'
import Loader from './components/Loader'

export default defineComponent({
  name: 'App',
  setup() {
    const userStore = useUserStore()
    const commonStore = useCommonStore()
    const loading = computed(() => commonStore.loading)
    const error = computed(() => commonStore.error)

    return () => {
      return (
        <div class="container">
          <GlobalHeader user={userStore} />
          <h1>{error.value.message}</h1>
          {loading.value && <Loader></Loader>}
          <router-view></router-view>
          <footer class="text-center py-4 text-secondary bg-light mt-6">
            <small>
              <ul class="list-inline mb-0">
                <li class="list-inline-item">者也专栏</li>
                <li class="list-inline-item">课程</li>
                <li class="list-inline-item">文档</li>
                <li class="list-inline-item">联系</li>
                <li class="list-inline-item">更多</li>
              </ul>
            </small>
          </footer>
        </div>
      )
    }
  }
})
