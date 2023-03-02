<template>
  <m-loading v-if="isLoading"></m-loading>
  <background></background>
  <global-header :user-data="userData">
    <router-link active-class="active" to="/home">首&nbsp;页</router-link>
    <router-link active-class="active" to="/info">资&nbsp;料</router-link>
    <router-link active-class="active" to="/articles">文&nbsp;章</router-link>
    <router-link active-class="active" to="/about">关&nbsp;于</router-link>
  </global-header>
  <Login v-if="isShowLogin"></Login>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import globalHeader, { userDataProp } from './components/globalHeader.vue';
import { defineComponent, computed } from 'vue';
import background from './components/background.vue';
import Login from './pages/Login.vue';
import { useStore } from 'vuex';
import mLoading from './components/loading.vue';
export default defineComponent({
  components:{
    mLoading,
    globalHeader,
    background,
    Login,
  },
  setup() {
    const store = useStore();
    const userData = computed<userDataProp>(() => store.state.user);
    const isShowLogin = computed<userDataProp>(() => store.state.isShowLogin);
    const isLoading = computed<userDataProp>(() => store.state.isLoading);

    return {
      userData,
      isShowLogin,
      isLoading
    }
  }
})
</script>

<style scoped lang="less">
.main{
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
