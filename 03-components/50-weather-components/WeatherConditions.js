import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherConditions',

  props: {
    icon: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    conditionDescription: {
      type: String,
      required: true,
    },
  },

  template: `
    <div class="weather-conditions">
      <div
        class="weather-conditions__icon"
        :title="conditionDescription"
      >
        {{ icon }}
      </div>
      <div class="weather-conditions__temp">
        {{ temperature }} °C
      </div>
    </div>
  `,
})
