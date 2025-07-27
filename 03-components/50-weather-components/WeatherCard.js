import { defineComponent, computed } from 'vue'
import WeatherAlert from './WeatherAlert.js'
import WeatherConditions from './WeatherConditions.js'
import WeatherDetails from './WeatherDetails.js'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
    WeatherConditions,
    WeatherDetails,
  },

  props: {
    city: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    cloudiness: {
      type: Number,
      required: true,
    },
    wind: {
      type: Number,
      required: true,
    },
    weatherIcon: {
      type: String,
      required: true,
    },
    conditionDescription: {
      type: String,
      required: true,
    },
    alertMessage: {
      type: String,
      default: '',
    },
    alert: {
        type: Boolean,
        default: false
    },
    isNight: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const cardClass = computed(() => (props.isNight ? 'weather-card--night' : ''))
    return {
      cardClass,
    }
  },

  template: `
    <li :class="['weather-card', cardClass]">
      <WeatherAlert v-if="alert">
        {{ alertMessage }}
      </WeatherAlert>

      <div>
        <h2 class="weather-card__name">{{ city }}</h2>
        <div class="weather-card__time">{{ time }}</div>
      </div>

      <WeatherConditions
        :icon="weatherIcon"
        :temperature="temperature"
        :conditionDescription="conditionDescription"
      />

      <WeatherDetails
        :pressure="pressure"
        :humidity="humidity"
        :cloudiness="cloudiness"
        :wind="wind"
      />
    </li>
  `,
})
