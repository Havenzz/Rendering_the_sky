import { createStore } from 'vuex';
import { MockUrl } from '../http';

interface UserProps {
    isLogin: boolean;
    username: string;
    avatarURL: string;
}

export interface ItemProps {
    itemImgURL: string[];
    itemName: string;
    itemURL?: string;
    itemCycle: string;
    itemDescribe: string;
    itemStack: string;
    itemModule: string;
    itemDuty: string[];
    itemPointer: string[];
}

interface GlobalDataProps {
    user: UserProps;
    project: ItemProps[];
    isShowLogin: boolean;
    isLoading: boolean;
}

const store = createStore<GlobalDataProps>({
    state: {
        user: {
            isLogin: false,
            username: '',
            avatarURL: '',
        },
        project: [],
        isShowLogin: false,
        isLoading: false
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
        }
    },
    mutations: {
        UPDATE_USERSTATE(state,projectData) {
            state.user = {
                ...projectData,
                isLogin:true
            }
        },
        UPDATE_ISSHOWLOGIN(state,payload){
            state.isShowLogin = payload
        },
        UPDATE_ISLOADING(state,payload){
            state.isLoading = payload
        }
    }
})

export default store