import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import apiBaseUrl from './plugin/apiBaseUrl'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(apiBaseUrl)
app.mount('#app')
