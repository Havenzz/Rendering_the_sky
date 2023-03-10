import { createStore } from 'vuex';
import axios from 'axios';
import { NavigationGuardNext } from 'vue-router';
import createMessage, { MESSAGE_DELAY } from '../components/createMessage';
import { DEFAULT_DELAY, ERROR_DELAY, PROGSTATE } from '../main'


export const LOGIN_STATE_KEY = 'autoLogin'
interface UserProps {
    isLogin: boolean;
    username: string;
    avatarURL: string;
    time?: number;
}

export interface GlobalDataProps {
    user: UserProps;
    isShowLogin: boolean;
    isLoading: boolean;
    progress: number;
}

export interface userData {
    username: string;
    password: string;
}

const store = createStore<GlobalDataProps>({
    state: {
        user: {
            isLogin: false,
            username: '',
            avatarURL: ''
        },
        isShowLogin: false,
        isLoading: false,
        progress: 0,
    },
    getters: {
        time(state) {
            if (state.user.time) {
                return state.user.time
            } else {
                return +new Date()
            }
        }
    },
    actions: {
        update_progress({ commit }, progress) {
            if (progress === PROGSTATE.DONE) {
                commit('UPDATE_PROGRESS', progress)
                setTimeout(() => {
                    commit('UPDATE_PROGRESS', PROGSTATE.INITIAL)
                }, DEFAULT_DELAY);
            } else {
                commit('UPDATE_PROGRESS', progress)
            }
        },
        async getUser({ dispatch, commit }) {
            const { data: { data, time } } = await axios.get('user')
            commit('UPDATE_USERSTATE', { ...data, isLogin: true, time })
        },
        async refreshToken({ dispatch, commit }) {
            const { data: { data, time } } = await axios.put('user')
            commit('UPDATE_USERSTATE', { ...data, isLogin: true, time })
            createMessage(`欢迎回来 ${data.username} (●'◡'●)`, 'success', MESSAGE_DELAY)
        },
        async signIn({ commit }, payload) {
            try {
                const { data: { data, time } } = await axios.post('/user/signin', payload.user)
                commit('UPDATE_USERSTATE', { ...data, isLogin: true, time })
                // 保存登录状态
                localStorage.setItem(LOGIN_STATE_KEY, 'y')
                createMessage(`欢迎回来 ${data.username} (●'◡'●)`, 'success', MESSAGE_DELAY)
                // 关闭login组件的loading效果和关闭Login组件
                payload.params.isLoading.value = false;
                payload.params.closeLogin()
            } catch (error: any) {
                if (error !== 'debounced') {
                    payload.params.isLoading.value = false;
                    if (error?.response?.data?.error) {
                        createMessage(`${error?.response.data.error}`, 'error', ERROR_DELAY)
                    } else {
                        createMessage(`${error}`, 'error', ERROR_DELAY)
                    }
                }
            }
        },
        async signOut({ commit }) {
            try {
                const { data: { time } } = await axios.delete('/user')
                commit('UPDATE_USERSTATE', { isLogin: false, username: '', avatarURL: '', time })
                createMessage(`已退出登录(●'◡'●)`, 'success', MESSAGE_DELAY);
                localStorage.removeItem(LOGIN_STATE_KEY);
                location.reload()
            } catch (error) {
                console.log(error, 'signOut')
            }
        }
    },
    mutations: {
        UPDATE_USERSTATE(state, userData) {
            state.user = {
                ...userData,
            }
        },
        UPDATE_ISSHOWLOGIN(state, payload) {
            state.isShowLogin = payload
        },
        UPDATE_ISLOADING(state, payload) {
            state.isLoading = payload
        },
        UPDATE_PROGRESS(state, payload) {
            state.progress = payload
        },
    },
})

export default store