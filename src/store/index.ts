import { createStore } from 'vuex';
import axios from 'axios';
import { NavigationGuardNext } from 'vue-router';
import createMessage, { MESSAGE_DELAY } from '../components/common/createMessage';
import { DEFAULT_DELAY, ERROR_DELAY, PROGSTATE } from '../main'


export const LOGIN_STATE_KEY = 'autoLogin';

export interface Tag {
    name: string;
    id: string;
    createTime: string
}

export interface Article {
    title: string;
    content: string;
    describe: string;
    tags: Tag[];
    id: string;
    createTime: string;
    uploader: string;
    imageSrc:string;
    editTime:string;
    isTop:boolean;
}

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
    tags: Tag[];
    articles: Article[];
    articleTotal:number;
    tagsEdit: boolean;
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
        tags: [],
        articles: [],
        articleTotal:0,
        tagsEdit: false
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
        async getUser({ dispatch, commit }, next: NavigationGuardNext) {
            try {
                const { data: { data, time } } = await axios.get('user')
                commit('UPDATE_USERSTATE', { ...data, isLogin: true, time })
                next()
            } catch (error: any) {
                if (error.response?.data?.data?.refresh) {
                    dispatch('refreshToken', next)
                } else {
                    console.log('getUserError', error)
                }
            }
        },
        async refreshToken({ dispatch, commit }, next: NavigationGuardNext) {
            try {
                const { data: { data, time } } = await axios.put('user')
                commit('UPDATE_USERSTATE', { ...data, isLogin: true, time })
                createMessage(`欢迎回来 ${data.username} (●'◡'●)`, 'success', MESSAGE_DELAY)
                next()
            } catch (error: any) {
                createMessage('身份已过期，请重新登录', 'error', MESSAGE_DELAY)
                localStorage.removeItem(LOGIN_STATE_KEY)
                dispatch('signOut')
                next('/')
            }
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
        },
        async postArticle({ commit }, payload) {
            return await axios.post('/articles', payload, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            });
        },
        async deleteArticle({ dispatch }, id) {
            await axios.delete('/articles', {
                data:{ id }
            });
            dispatch('getArticles')
            createMessage(`删除成功(●'◡'●)`,'success',MESSAGE_DELAY)
        },
        async updateArticle({ commit }, payload) {
            return await axios.put('/articles', payload, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            });
        },
        async setTopArticle({ dispatch },id) {
            await axios.put('/articles/setTop',{ id });
            dispatch('getArticles');
            createMessage(`置顶成功 (●'◡'●)`,'success',MESSAGE_DELAY)
        },
        async cancleTopArticle({ dispatch }) {
            await axios.delete('/articles/setTop');
            dispatch('getArticles');
            createMessage(`取消置顶成功 (●'◡'●)`,'success',MESSAGE_DELAY)
        },
        async getArticle(ctx,id) {
            return await axios.get(`/articles/${id}`);
        },
        async getArticles({ commit }) {
            const { data:{ data } } = await axios.get('/articles');
            commit('UPDATE_ARTICLES',data)
        },
        async searchArticles({ commit }, payload) {
            const { data:{ data } } = await axios.get('/articles', {
                params:{
                    ...payload
                }
            });
            commit('UPDATE_ARTICLES',data)
        },
        async getTags({ commit }, tagsRef?: any) {
            const { data: { data: tags } } = await axios.get('tags');
            commit('UPDATE_TAGS', tags);
            if (tagsRef) {
                tagsRef.value = tags;
            }
        },
        async addTag({ dispatch }, { newTag, tags }) {
            await axios.post('tags', newTag);
            createMessage(`${newTag.name} 添加成功`, 'success', MESSAGE_DELAY)
            dispatch('getTags', tags)
        },
        async removeTag({ dispatch }, { removeTag, tags }) {
            await axios.delete('tags', { data: { id: removeTag.id } });
            createMessage(`${removeTag.name} 删除成功`, 'success', MESSAGE_DELAY)
            dispatch('getTags', tags)
        },
        async updateTag({ dispatch }, { updateTag, tags }) {
            await axios.put('tags', updateTag);
            createMessage(`${updateTag.name} 修改成功`, 'success', MESSAGE_DELAY)
            dispatch('getTags', tags)
        },
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
        UPDATE_TAGS(state, payload) {
            state.tags = payload
        },
        UPDATE_TAGSEDIT(state, payload) {
            state.tagsEdit = payload
        },
        UPDATE_ARTICLES(state,{ articleList, count}){
            state.articles = articleList
            state.articleTotal = count
        }
    },
})

export default store