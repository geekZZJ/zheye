import { defineComponent, ref } from 'vue'

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
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return () => {
      return (
        <div class="dropdown">
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
