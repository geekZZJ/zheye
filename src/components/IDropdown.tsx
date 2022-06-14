import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'IDropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const handler = (e: MouseEvent) => {
      if (dropdownRef.value) {
        if (
          !dropdownRef.value.contains(e.target as HTMLElement) &&
          isOpen.value
        ) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })
    return () => {
      return (
        <div class="dropdown" ref={dropdownRef}>
          <a
            href="#"
            class="btn btn-outline-light my-2 dropdown-toggle"
            onClick={toggleOpen}
          >
            {props.title}
          </a>
          {/* eslint-disable-next-line */}
          {isOpen.value ? (
            <ul class="dropdown-menu" style="display:block">
              {slots.default?.()}
            </ul>
          ) : null}
        </div>
      )
    }
  }
})
