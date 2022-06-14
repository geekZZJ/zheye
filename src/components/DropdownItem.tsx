import { defineComponent } from 'vue'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  disabled: {
    color: '#6c757d',
    pointerEvents: 'none',
    backgroundColor: 'transparent'
  }
})

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    return () => {
      const classes = classesRef.value
      return (
        <li class={`dropdown-option ${props.disabled ? classes.disabled : ''}`}>
          {slots.default?.()}
        </li>
      )
    }
  }
})
