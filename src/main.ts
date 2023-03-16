import { createApp } from 'vue'
import store from './store'
import './style.css'
import './assets/font/iconfont.css'
import App from './App.vue'
import router from './router'
import axios, { AxiosRequestConfig } from 'axios'
import debounce from 'lodash/debounce'
import { LOGIN_STATE_KEY } from './http'
import createMessage, { MESSAGE_DELAY } from './components/common/createMessage'
import vueLazyload from 'vue-lazyload'
import loading from './assets/loading.jpg'

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
// refresh 标识
let isNotRefreshing = true;
// 请求队列
const requests:any[] = []

// axios
axios.interceptors.request.use(config => {
    const key = `${config.method}-${config.url}`;
    if (!requestQueue.has(key)) {
        store.commit('UPDATE_ISLOADING',true);
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
    store.commit('UPDATE_ISLOADING',false)
    clearRequestQueue(response.config)
    return response
}, error => {
    if (error?.response?.data?.error === 'Forbidden'){
        const config = error.config;
        if(isNotRefreshing){
            isNotRefreshing = false;
            return axios.put('user').then(res => {
                const { data: { data, time } } = res;
                requests.forEach(run => run());
                requests.splice(0,requests.length)
                store.commit('UPDATE_USERSTATE', { ...data, isLogin: true, time })
                createMessage(`欢迎回来 ${data.username} (●'◡'●)`, 'success', MESSAGE_DELAY)
                return axios(config)
            }).catch(e => {
                if(e.status === 401){
                    createMessage('身份已过期，请重新登录', 'error', MESSAGE_DELAY)
                    localStorage.removeItem(LOGIN_STATE_KEY)
                    store.dispatch('signOut')
                }
            }).finally(() => {
                isNotRefreshing = true;
                setTimeout(() => {
                    clearRequestQueue(config)
                }, ERROR_DELAY);
            })
        }else{
            return new Promise(resolve => {
                requests.push(() => {
                    resolve(axios(config))
                    setTimeout(() => {
                        clearRequestQueue(config)
                    }, ERROR_DELAY);
                })
            })
        }
    }
    if (error.code === 'ERR_NETWORK') {
        createMessage('服务器出错啦', 'error', MESSAGE_DELAY);
        setTimeout(() => {
            clearRequestQueue(error.config)
        }, ERROR_DELAY);
        return Promise.reject(error);
    }
    if (error !== 'debounced') {
        setTimeout(() => {
            store.dispatch('update_progress', PROGSTATE.INITIAL)
            // 由于错误响应非常快 所以这里延时释放
            clearRequestQueue(error.config)
        }, ERROR_DELAY);
    }
    store.commit('UPDATE_ISLOADING',false)
    return Promise.reject(error)
})


// router
router.beforeEach((to, from, next) => {
    const { user } = store.state
    const { requireLogin } = to.meta
    store.dispatch('update_progress', PROGSTATE.ACTIVE)
    if (!user.isLogin) {
        if (localStorage.getItem(LOGIN_STATE_KEY)) {
            store.dispatch('getUser', next)
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
app.use(vueLazyload,{
    loading,
    error:loading
})
app.mount('#app')

