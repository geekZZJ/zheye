import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IDropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
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
              <li class="dropdown-item">
                <a href="#">新建文章</a>
              </li>
              <li class="dropdown-item">
                <a href="#">编辑资料</a>
              </li>
            </ul>
          ) : null}
        </div>
      )
    }
  }
})
