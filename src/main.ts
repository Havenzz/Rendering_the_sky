import { createApp } from 'vue'
import store from './store'
import './style.css'
import 'easymde/dist/easymde.min.css'
import './assets/font/iconfont.css'
import App from './App.vue'
import router from './router'
import axios, { AxiosRequestConfig } from 'axios'
import debounce from 'lodash/debounce'
import { LOGIN_STATE_KEY } from './http'
import createMessage from './components/createMessage'


// 进度条进度枚举
export const enum PROGSTATE {
    INITIAL = 0,
    ACTIVE = 0.4,
    DONE = 1
}

// 请求队列 重复的请求会被记录下来 直到请求返回才释放
const requestQueue = new Map();
// 延迟时间
export const DEFAULT_DELAY = 600;
export const ERROR_DELAY = 1200;
// 释放函数
function clearRequestQueue(config: AxiosRequestConfig) {
    if (config) {
        const key = `${config.method}-${config.url}`;
        requestQueue.delete(key);
    }
}

// axios
axios.interceptors.request.use(config => {
    const key = `${config.method}-${config.url}`;
    if (!requestQueue.has(key)) {
        store.dispatch('update_progress', PROGSTATE.ACTIVE)
        // 使用 lodash 的防抖函数，限制请求发送的频率
        const debouncedRequest = debounce(() => {
            clearRequestQueue(config);
            config.onDownloadProgress = progress => {
                if (progress.total) {
                    if (progress.loaded / progress.total !== PROGSTATE.DONE) {
                        store.dispatch('update_progress', progress.loaded / progress.total)
                    }
                }
            }
        }, DEFAULT_DELAY);

        requestQueue.set(key, debouncedRequest);
        return config;
    }
    return Promise.reject('debounced');
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    console.log(response)
    store.dispatch('update_progress', PROGSTATE.DONE)
    clearRequestQueue(response.config)
    return response
}, error => {
    console.log(error)
    if (error !== 'debounced') {
        setTimeout(() => {
            store.dispatch('update_progress', PROGSTATE.INITIAL)
            // 由于错误响应非常快 所以这里延时释放
            clearRequestQueue(error.config)
        }, ERROR_DELAY);
    }
    return Promise.reject(error)
})


// router
router.beforeEach((to, from, next) => {
    const { user } = store.state
    const { requireLogin } = to.meta
    store.dispatch('update_progress', PROGSTATE.ACTIVE)
    if (!user.isLogin) {
        if (localStorage.getItem(LOGIN_STATE_KEY)) {
            try {
                store.dispatch('getUser', next)
            } catch (error) {
                next(from.path || '/')
            }
        } else {
            if (requireLogin) {
                createMessage(`该页面需要权限，请登录后再访问(●'◡'●)`, 'error', ERROR_DELAY)
                next(from.path || '/')
            } else {
                next()
            }
        }
    } else {
        if (requireLogin) {
            store.dispatch('getUser', next)
        } else {
            next()
        }
    }
})

router.afterEach((to, from) => {
    store.dispatch('update_progress', PROGSTATE.DONE)
})


const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

