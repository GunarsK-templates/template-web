import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/global.css'

const app = createApp(App)

// State management (optional - remove if not needed)
app.use(createPinia())

// Router
app.use(router)

app.mount('#app')
