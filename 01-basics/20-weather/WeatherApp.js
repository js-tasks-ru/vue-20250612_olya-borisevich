import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherCards = getWeatherData()

    function temperatureKelvinToCelsius(temp) {
      return (temp - 273.15).toFixed(1)
    }

    function pressureСalculations(pressure) {
      return (pressure * 0.75).toFixed(0)
    }

    function isNight(weatherCard) {
      const toMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number)
        return hours * 60 + minutes
      }

      const current = toMinutes(weatherCard.current.dt)
      const sunrise = toMinutes(weatherCard.current.sunrise)
      const sunset  = toMinutes(weatherCard.current.sunset)

      return current < sunrise || current > sunset
    }

    return {
        weatherCards,
        temperatureKelvinToCelsius,
        pressureСalculations,
        WeatherConditionIcons,
        isNight,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li 
          v-for="(weatherCard, index) in weatherCards"
          :key="index"
          :class="{ 'weather-card--night': isNight(weatherCard) }"
          class="weather-card"
          >
          <div v-if="weatherCard.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherCard.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherCard.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div
              :title="weatherCard.current.weather.description"
              class="weather-conditions__icon"
            >
              {{ WeatherConditionIcons[weatherCard.current.weather.id] }}
            </div>
            <div class="weather-conditions__temp">{{ temperatureKelvinToCelsius(weatherCard.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ pressureСalculations(weatherCard.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherCard.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
