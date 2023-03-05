<template>
  <loading v-if="isLoading"></loading>
  <background></background>
  <global-header :user-data="userData"></global-header>
  <Login v-if="isShowLogin"></Login>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
  <mprogress :progress="progress"></mprogress>
</template>

<script setup lang="ts">
import globalHeader, { userDataProp } from './components/globalHeader.vue';
import { computed } from 'vue';
import background from './components/background.vue';
import Login from './pages/Login.vue';
import { useStore } from 'vuex';
import loading from './components/loading.vue';
import mprogress from './components/mprogress.vue';

const store = useStore();

const userData = computed<userDataProp>(() => store.state.user);
const isShowLogin = computed(() => store.state.isShowLogin);
const isLoading = computed(() => store.state.isLoading);
const progress = computed<number>(() => store.state.progress);


</script>

<style scoped lang="less">
.main {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
