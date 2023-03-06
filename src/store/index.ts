import { createStore } from 'vuex';
import axios from 'axios';
import { NavigationGuardNext } from 'vue-router';
import createMessage from '../components/createMessage';
import { DEFAULT_DELAY, PROGSTATE } from '../main'

const MESSAGE_DELAY = 2000;

export const LOGIN_STATE_KEY = 'autoLogin'
interface UserProps {
    isLogin: boolean;
    username: string;
    avatarURL: string;
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
            avatarURL: '',
        },
        isShowLogin: false,
        isLoading: false,
        progress: 0
    },
    actions: {
        update_progress({ commit }, progress) {
            if (progress === PROGSTATE.DONE) {
                commit('UPDATE_PROGRESS', progress)
                setTimeout(() => {
                    commit('UPDATE_PROGRESS', PROGSTATE.INITIAL)
                }, 600);
            } else {
                commit('UPDATE_PROGRESS', progress)
            }
        },
        async getUser({ dispatch, commit }, next: NavigationGuardNext) {
            try {
                const { data } = await axios.get('user')
                commit('UPDATE_USERSTATE', { ...data, isLogin: true })
                next()
            } catch (e: any) {
                if (e.response?.data?.refresh) {
                    dispatch('refreshToken', next)
                }
            }
        },
        async refreshToken({ dispatch, commit }, next: NavigationGuardNext) {
            try {
                const { data } = await axios.put('user')
                commit('UPDATE_USERSTATE', { ...data, isLogin: true })
                createMessage(`欢迎回来 ${data.username} (●'◡'●)`, 'success', MESSAGE_DELAY)
                next && next()
            } catch (error) {
                localStorage.removeItem(LOGIN_STATE_KEY)
                dispatch('signOut')
                next && next()
            }
        },
        async signIn({ commit }, payload) {
            try {
                const { data } = await axios.post('/user/signin', payload.user)
                commit('UPDATE_USERSTATE', { ...data, isLogin: true })
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
                        createMessage(`${error?.response.data.error}`, 'error', DEFAULT_DELAY)
                    } else {
                        console.log(error)
                    }
                }
            }
        },
        async signOut({ commit }) {
            axios.delete('/user').then(() => {
                commit('UPDATE_USERSTATE', { isLogin: false, username: '', avatarURL: '' })
                createMessage(`已退出登录(●'◡'●)`, 'success', 2000)
                localStorage.removeItem(LOGIN_STATE_KEY)
            })
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
        }
    }
})

export default store