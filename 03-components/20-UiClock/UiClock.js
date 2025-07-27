import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref(new Date().toLocaleTimeString('en-US', { timeStyle: 'medium' }))
    let timerId = null

    const updateTime = () => {
      time.value = new Date().toLocaleTimeString('en-US', { timeStyle: 'medium' })
    }

    onMounted(() => {
      updateTime()
      timerId = setInterval(updateTime, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(timerId)
    })

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
