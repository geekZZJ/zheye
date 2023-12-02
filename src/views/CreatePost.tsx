import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm'
import ValidateInput, { RulesProp } from '@/components/ValidateInput'
import { useUserStore } from '@/store/user'
import { usePostStore } from '@/store/post'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  props: {},
  setup() {
    const userStore = useUserStore()
    const postStore = usePostStore()
    const router = useRouter()
    const isEditMode = false
    const titleVal = ref('')
    const contentVal = ref('')
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

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadFile = files[0]
        const formData = new FormData()
        formData.append(uploadFile.name, uploadFile)
        // axios.post('/upload', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // })
        console.log('formData', formData)
      }
    }

    return () => {
      return (
        <div class="create-post-page">
          <h4>{isEditMode ? '编辑文章' : '新建文章'}</h4>
          <input type="file" name="file" onChange={handleFileChange} />
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
