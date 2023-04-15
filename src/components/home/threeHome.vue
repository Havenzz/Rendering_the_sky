<template>
    <loading :style="{ width: width + 'px', height: height + 'px' }" v-if="isLoading">
        <span class="loadingSpan">(●'◡'●) 模型加载中...</span>
    </loading>
    <div id="home_threeJS" v-show="!isLoading" ref="threeRef"></div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import useThreeRender from '../../hook/useThreeRender';
import loading from '../common/loading.vue';
const threeRef = ref<Ref | null>(null);
const { width, height, isLoading } = useThreeRender(threeRef)

</script>

<style scoped lang="less">
@media screen and (max-width: 1200px) {
    .common_loading {
        margin: 0 auto;
    }
}

.loadingSpan {
    display: block;
    box-sizing: border-box;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 30px;
    padding-top: 30px;
}

#home_threeJS {
    overflow: hidden;

    @media screen and (max-width: 1200px) {
        margin: 0 auto;
    }
}

:deep(#home_threeJS canvas) {
    cursor: grab;
}
</style>