import { createStore } from 'vuex';
import { MockUrl } from '../http';

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

const store = createStore<GlobalDataProps>({
    state: {
        user: {
            isLogin: false,
            username: '',
            avatarURL: '',
        },
        isShowLogin: false,
        isLoading: false,
        progress:0
    },
    actions: {
        async fetchProjectData({ commit }) {
            try {
                const {data:{data}} = await MockUrl.get('/project');
                if(!data)throw new Error()
                commit('UPDATE_PROJECT',data);
            } catch (error) {
                location.replace('/')
            }
        },
        update_progress({ commit },progress){
            if(progress === 1){
                commit('UPDATE_PROGRESS',progress)
                setTimeout(() => {
                    commit('UPDATE_PROGRESS',0)
                }, 600);
            }else{
                commit('UPDATE_PROGRESS',progress)
            }
        }
    },
    mutations: {
        UPDATE_USERSTATE(state,userData) {
            state.user = {
                ...userData,
            }
        },
        UPDATE_ISSHOWLOGIN(state,payload){
            state.isShowLogin = payload
        },
        UPDATE_ISLOADING(state,payload){
            state.isLoading = payload
        },
        UPDATE_PROGRESS(state,payload){
            state.progress = payload
        }
    }
})

export default store