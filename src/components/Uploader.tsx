import axios from 'axios'
import { defineComponent, ref, PropType } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean

export default defineComponent({
  props: {
    action: {
      type: String,
      require: true,
      default: ''
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, { slots, emit }) {
    const fileInputRef = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')

    const triggerUpload = () => {
      if (fileInputRef.value) {
        fileInputRef.value.click()
      }
    }

    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) return
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
            fileStatus.value = 'success'
            emit('file-uploaded', res.data)
          })
          .catch((err) => {
            fileStatus.value = 'error'
            emit('file-uploaded-error', err)
          })
          .finally(() => {
            if (fileInputRef.value) {
              fileInputRef.value.value = ''
            }
          })
      }
    }

    return () => {
      return (
        <div class="file-upload">
          <div class="file-upload-container" onClick={triggerUpload}>
            {fileStatus.value === 'loading' ? (
              slots.loading ? (
                slots.loading()
              ) : (
                <button class="btn btn-primary" disabled>
                  正在上传...
                </button>
              )
            ) : null}
            {fileStatus.value === 'success' ? (
              slots.uploaded ? (
                slots.uploaded()
              ) : (
                <button class="btn btn-primary">上传成功</button>
              )
            ) : null}
            {fileStatus.value === 'ready' ? (
              slots.default ? (
                slots.default()
              ) : (
                <button class="btn btn-primary">点击上传</button>
              )
            ) : null}
          </div>

          <input
            type="file"
            class="file-input d-none"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      )
    }
  }
})
