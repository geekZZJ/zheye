import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '../components/ColumnList'
import calloutImg from '../assets/callout.svg'

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

export default defineComponent({
  name: 'HomeView',
  props: {},
  setup() {
    return () => {
      return (
        <div class="home-page">
          <section class="py-5 text-center container">
            <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 mx-auto">
                <img src={calloutImg} alt="callout" class="w-50" />
                <h2 class="font-weight-light">随心写作，自由表达</h2>
                <p>
                  <a href="#" class="btn btn-primary my-2">
                    开始写文章
                  </a>
                </p>
              </div>
            </div>
          </section>
          <h4 class="font-weight-bold text-center">发现精彩</h4>
          <ColumnList list={testData} />
          <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25">
            加载更多
          </button>
        </div>
      )
    }
  }
})
