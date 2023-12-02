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
  setup(props, context) {
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
            context.emit('file-uploaded', res.data)
          })
          .catch((err) => {
            fileStatus.value = 'error'
            context.emit('file-uploaded-error', err)
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
          <button class="btn btn-primary" onClick={triggerUpload}>
            {fileStatus.value === 'loading' ? (
              <span>正在上传...</span>
            ) : (
              <span>点击上传</span>
            )}
          </button>

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
