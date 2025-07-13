import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import WeatherCard from './WeatherCard.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherCard,
    WeatherConditionIcons,
  },

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
        <WeatherCard
          v-for="(card, index) in weatherCards"
          :key="index"
          :city="card.geographic_name"
          :time="card.current.dt"
          :temperature="temperatureKelvinToCelsius(card.current.temp)"
          :pressure="pressureСalculations(card.current.pressure)"
          :humidity="card.current.humidity"
          :cloudiness="card.current.clouds"
          :wind="card.current.wind_speed"
          :weatherIcon="WeatherConditionIcons[card.current.weather.id]"
          :conditionDescription="card.current.weather.description"
          alertMessage="Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма."
          :isNight="isNight(card)"
          :alert="card.alert"
        />
      </ul>
    </div>
  `,
})
