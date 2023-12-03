import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm'
import ValidateInput, { RulesProp } from '@/components/ValidateInput'
import { useUserStore } from '@/store/user'
import { usePostStore } from '@/store/post'
import { useRouter } from 'vue-router'
import Uploader from '@/components/Uploader'
import './CreatePost.css'
import { ImageProps } from '@/testData'
import createMessage from '@/components/createMessage'
import { ResponseType } from '@/store/common'
import { beforeUploadCheck } from '@/helper'

export default defineComponent({
  props: {},
  setup() {
    const userStore = useUserStore()
    const postStore = usePostStore()
    const router = useRouter()
    const isEditMode = false
    const titleVal = ref('')
    const contentVal = ref('')
    const uploadResRef = ref()

    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]

    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]

    const slots = {
      submit: () => (
        <button type="button" class="btn btn-primary btn-large">
          {isEditMode ? '更新文章' : '发表文章'}
        </button>
      )
    }

    const slot = {
      loading: () => (
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      ),
      default: () => <h2>点击上传头图</h2>,
      uploaded: () => (
        <div class="uploaded-area">
          <img src={uploadResRef.value.data.url} alt="" />
          <h3>点击重新上传</h3>
        </div>
      )
    }

    const onFileUploaded = (rowData: ResponseType<ImageProps>) => {
      createMessage(`上传图片id ${rowData.data._id}`, 'success')
      uploadResRef.value = rowData
    }

    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, {
        format: ['image/jpeg', 'image/png'],
        size: 1
      })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是jpg/png格式', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过1MB', 'error')
      }
      return passed
    }

    const onFormSubmit = (result: boolean) => {
      console.log('测试测试', result)
      if (result) {
        // const { columnId } = userStore
        // const newPost: PostProps = {
        //   id: new Date().getTime(),
        //   title: titleVal.value,
        //   content: contentVal.value,
        //   columnId,
        //   createdAt: new Date().toLocaleString()
        // }
        // postStore.createPost(newPost)
        // router.push(`/column/${newPost.columnId}`)
      }
    }

    return () => {
      return (
        <div class="create-post-page">
          <h4>{isEditMode ? '编辑文章' : '新建文章'}</h4>
          <Uploader
            action="/upload"
            class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
            v-slots={slot}
            onFile-uploaded={onFileUploaded}
            beforeUpload={uploadCheck}
          ></Uploader>
          <ValidateForm v-slots={slots} {...{ onFormSubmit: onFormSubmit }}>
            <div class="mb-3">
              <label class="form-label">文章标题：</label>
              <ValidateInput
                rules={titleRules}
                v-model={titleVal.value}
                placeholder="请输入文章标题"
                type="text"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">文章详情：</label>
              <ValidateInput
                rows="10"
                tag="textarea"
                placeholder="请输入文章详情"
                rules={contentRules}
                v-model={contentVal.value}
              />
            </div>
          </ValidateForm>
        </div>
      )
    }
  }
})
