import { computed, defineComponent, ref } from 'vue'

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
]

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup() {
    const items = ref(emails)
    const search = ref('')

    const filteredItems = computed(() => {
      if (search.value) {
        return items.value.filter(item =>
          item.toLowerCase().includes(search.value.toLowerCase())
        )
      }
      return items.value
    })

    const isMarked = item => {
      if (!search.value) return false
      return item.toLowerCase().includes(search.value.toLowerCase())
    }

    return {
      items,
      search,
      filteredItems,
      isMarked,
    }
  },

  template: `
    <div>
      <div class="form-group">
        <input v-model="search" type="search" aria-label="Search" />
      </div>
      <ul aria-label="Emails">
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="{marked: isMarked(item)}"
          >
          {{ item }}
        </li>
      </ul>
    </div>
  `,
})
