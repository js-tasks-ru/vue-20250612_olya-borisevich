import { defineComponent,ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0)

    function increment() {
      count.value++
    }

    function decrement() {
      count.value--
    }

    return {
      count,
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <button
        @click="decrement"
        :disabled="count <= 0"
        class="button button--secondary"
        type="button"
        aria-label="Decrement"        
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        @click="increment"
        :disabled="count >= 5"
        class="button button--secondary"
        type="button"
        aria-label="Increment"
      >➕</button>
    </div>
  `,
})
