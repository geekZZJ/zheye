import { defineComponent, watch, ref } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

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
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return () => {
      return (
        <div class="dropdown" ref={dropdownRef}>
          <a
            class="btn btn-outline-light my-2 dropdown-toggle"
            onClick={toggleOpen}
          >
            {props.title}
          </a>
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
