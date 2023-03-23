import { defineComponent } from 'vue'
import { useColumnStore } from '@/store/column'
import ColumnList from '../components/ColumnList'
import calloutImg from '../assets/callout.svg'

export default defineComponent({
  name: 'HomeView',
  props: {},
  setup() {
    const columnStore = useColumnStore()
    const { columns } = columnStore
    console.log(columns)
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
          <ColumnList list={columns} />
          <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25">
            加载更多
          </button>
        </div>
      )
    }
  }
})
