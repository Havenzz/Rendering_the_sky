import { createStore } from 'vuex';
import { MockUrl } from '../http';

interface UserProps {
    isLogin: boolean;
    username: string;
    email: string;
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
            email: '',
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
        UPDATE_PROJECT(state,projectData) {
            state.project = projectData;
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