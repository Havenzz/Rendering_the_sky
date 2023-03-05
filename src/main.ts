import 'default-passive-events'
import { createApp } from 'vue'
import store from './store'
import './style.css'
import './assets/font/iconfont.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const enum progState {
    INITIAL = 0,
    ACTIVE = 0.4,
    DONE = 1
}

// axios
axios.interceptors.request.use(config => {
    store.dispatch('update_progress', progState.ACTIVE)
    config.onDownloadProgress = progress => {
        if (progress.total) {
            if (progress.loaded / progress.total !== 1) {
                store.dispatch('update_progress', progress.loaded / progress.total)
            }
        }
    }
    return config
}, error => {
    store.dispatch('update_progress', progState.INITIAL)
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    store.dispatch('update_progress', progState.DONE)
    return response
}, error => {
    store.dispatch('update_progress', progState.INITIAL)
    return Promise.reject(error)
})

// router

router.beforeEach((to, from, next) => {
    store.dispatch('update_progress', progState.ACTIVE)
    next()
})

router.afterEach((to, from) => {
    store.dispatch('update_progress', progState.DONE)
})


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

