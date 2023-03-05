import axios from 'axios';
import store from '../store'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export const MockUrl = axios.create({
    baseURL: 'https://www.fastmock.site/mock/79cad79f260f92472890423eddf0c375/caretblog',
    timeout: 5000
})

export interface userData {
    username: string;
    password: string;
}

export const signIn = (userData: userData, params: any) => {
    axios.post('/user/signin', userData)
        .then(r => {
            const { data } = r
            store.commit('UPDATE_USERSTATE', { ...data, isLogin: true })
            params.closeLogin()
        }).catch(e => {

        }).finally(() => {
            params.isLoading.value = false;
        })
}

export const signOut = () => {
    axios.delete('/user').then(r => {
        store.commit('UPDATE_USERSTATE', { isLogin: false, username: '', avatarURL: '' })
    })
}


export const getArtcile = (articleData: any) => {
    axios.get('/articles', articleData).then(res => res.data)
}

export const addArtcile = (articleData: any) => {
    axios.post('/articles', { params: articleData }).then(res => res.data)
}

export const updateArtcile = (articleData: any) => {
    axios.patch(`/articles/${articleData.id}`, articleData).then(res => res.data)
}

export const deleteArtcile = (articleDataId: any) => {
    axios.delete(`/articles/${articleDataId}`).then(res => res.data)
}