import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ExamCard from "./components/ExamCard.vue";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("exam-card", ExamCard);

app.mount('#app')
