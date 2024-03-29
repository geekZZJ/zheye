import { defineComponent, onMounted, ref } from 'vue'
import { useColumnStore } from '@/store/column'
import ColumnList from '../components/ColumnList'
import calloutImg from '../assets/callout.svg'
import { storeToRefs } from 'pinia'
import Uploader from '@/components/Uploader'
import createMessage from '@/components/createMessage'
import { ImageProps } from '@/testData'
import { ResponseType } from '@/store/common'

export default defineComponent({
  name: 'HomeView',
  props: {},
  setup() {
    const columnStore = useColumnStore()
    const { columns } = storeToRefs(columnStore)
    const uploadResRef = ref()

    onMounted(() => {
      columnStore.fetchColumns()
    })

    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('上传图片只能是JPG格式', 'error')
      }
      return isJPG
    }
    const onFileUploaded = (rowData: ResponseType<ImageProps>) => {
      createMessage(`上传图片id ${rowData.data._id}`, 'success')
      uploadResRef.value = rowData
    }

    const slot = {
      loading: () => (
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      ),
      default: () => <h2>点击上传</h2>,
      uploaded: () => <img src={uploadResRef.value.data.url} alt="" />
    }

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
          <Uploader
            beforeUpload={beforeUpload}
            onFile-uploaded={onFileUploaded}
            v-slots={slot}
          ></Uploader>
          <h4 class="font-weight-bold text-center">发现精彩</h4>
          <ColumnList list={columns.value} />
          <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25">
            加载更多
          </button>
        </div>
      )
    }
  }
})
