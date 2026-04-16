import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Підключаємо стилі з CDN (або локально, якщо встановлювала через npm)
import 'bootswatch/dist/lux/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'aos/dist/aos.css'

// JS бібліотеки
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AOS from 'aos'

const app = createApp(App)
app.use(router)

AOS.init({ duration: 1000, once: true })

app.mount('#app')