import { defineComponent, createApp } from 'vue'

const App = defineComponent({
    name: 'CreateApp',

    setup() {
        const currentDate = new Date()

        function formatAsLocalDate(timestamp) {
            return new Date(timestamp).toLocaleString(navigator.language, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        }

        return {
            currentDate,
            formatAsLocalDate,
        }
    },
    
    template: `
        <div>
            Сегодня {{ formatAsLocalDate(currentDate) }}
        </div>
    `
})

const app = createApp(App)

app.mount('#app')