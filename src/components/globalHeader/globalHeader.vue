<template>
    <div class="global-header">
        <div class="header-wrap">
            <navBar>
                <router-link active-class="active" to="/home">首&nbsp;页</router-link>
                <router-link active-class="active" to="/info">资&nbsp;料</router-link>
                <router-link active-class="active" to="/articles">文&nbsp;章</router-link>
                <router-link active-class="active" to="/about">关&nbsp;于</router-link>
            </navBar>
            <div class="header-right">
                <dropdown v-if="userData.isLogin">
                    <template #header>
                        <div class="userInfo">
                            <div class="avatar">
                                <img v-if="userData.avatarURL !== '#'" :src="userData.avatarURL">
                                <img v-else src="../../assets/logic.jpg">
                            </div>
                            <span>{{ userData.username }}</span>
                        </div>
                    </template>
                    <ul class="dropdown">
                        <li><router-link to="/articles/edit">新建文章</router-link></li>
                        <li @click="onSignOut">退出登录</li>
                    </ul>
                </dropdown>
                <div v-else @click="oepnLogin">
                    <span>登&nbsp;录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { defineProps } from 'vue';
import navBar from './navBar.vue';
import dropdown from '../common/dropdown.vue'
import { useRouter } from 'vue-router';

export interface userDataProp {
    username: string;
    isLogin: boolean;
    avatarURL: string;
}
const { userData } = defineProps<{ userData: userDataProp }>()

const store = useStore();
const router = useRouter()
const oepnLogin = () => {
    store.commit('UPDATE_ISSHOWLOGIN', true)
}

const onSignOut = () => {
    store.dispatch('signOut')
}

</script>

<style scoped lang="less">
.global-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 66px;
    z-index: 999;
    background-color: rgba(6, 6, 6, .66);
    box-shadow: 0px 3px 7px 0px rgb(0 0 0 / 35%);
}

.userInfo {
    display: flex;
    align-items: center;

    .avatar {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }
}

.dropdown li {
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    width: 130px;
    color: var(--white);
    a{
        color: var(--white);
    }
    
    a:hover,
    &:hover {
        color: #fff;
    }
}

.header-wrap {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.header-right span {
    padding-right: 30px;
    line-height: 66px;
    display: block;
    cursor: pointer;

    &:hover {
        color: #fff;
    }
}
</style>