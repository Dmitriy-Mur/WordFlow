import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './frontend/App.vue'
import './frontend/styles/global.scss'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
