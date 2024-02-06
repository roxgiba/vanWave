import './assets/main.css'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.mount('#app')
