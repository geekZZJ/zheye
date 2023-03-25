import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm'
import ValidateInput, { RulesProp } from '@/components/ValidateInput'

export default defineComponent({
  props: {},
  setup() {
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
        <button class="btn btn-primary btn-large">
          {isEditMode ? '更新文章' : '发表文章'}
        </button>
      )
    }

    return () => {
      return (
        <div class="create-post-page">
          <h4>{isEditMode ? '编辑文章' : '新建文章'}</h4>
          <ValidateForm v-slots={slots}>
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
                /* eslint-disable */
                // @ts-ignore
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
