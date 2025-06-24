import { defineComponent, ref, watch, onMounted } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const selectedId = ref(1)
    const meetupTitle = ref('')

    const fetchMeetup = async (id) => {
      const data = await getMeetup(id)
      meetupTitle.value = data.title
    }

    watch(selectedId, (newId) => {
      fetchMeetup(newId)
    })

    onMounted(() => fetchMeetup(selectedId.value))

    const selectPrev = () => {
      if (selectedId.value > 1) selectedId.value--
    }
    const selectNext = () => {
      if (selectedId.value < 5) selectedId.value++
    }

    return {
      selectedId,
      meetupTitle,
      selectPrev,
      selectNext,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          @click="selectPrev"
          class="button button--secondary"
          type="button"
          :disabled="selectedId === 1"
          >Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="id in 5" :key="id" class="radio-group__button">
            <input
              :id="'meetup-id-' + id"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="id"
              v-model="selectedId"
            />
            <label :for="'meetup-id-' + id" class="radio-group__label">{{ id }}</label>
          </div>
        </div>

        <button
          @click="selectNext"
          class="button button--secondary"
          type="button"
          :disabled="selectedId === 5"          
          >Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetupTitle }}</h1>
        </div>
      </div>

    </div>
  `,
})
