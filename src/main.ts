import 'default-passive-events'
import { createApp } from 'vue'
import store from './store'
import './style.css'
import './assets/font/iconfont.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
