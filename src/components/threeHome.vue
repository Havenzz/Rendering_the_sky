<template>
    <div class="home_loading" :style="{ width: width + 'px', height: height + 'px' }" v-if="isLoading">
        <span>(●'◡'●) 模型加载中...</span>
    </div>
    <div id="home_threeJS" v-show="!isLoading" ref="threeRef"></div>
</template>

<script setup lang="ts" name="threeHome">
import { ref, Ref } from 'vue';
import useThreeRender from '../hook/useThreeRender';
const threeRef = ref<Ref | null>(null);
const { width, height, isLoading } = useThreeRender(threeRef)

</script>

<style scoped lang="less">
.home_loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    --size: 50px;

    @media screen and (max-width: 1200px) {
        margin: 0 auto;
    }

    span {
        display: block;
        box-sizing: border-box;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 30px;
        padding-top: 30px;
    }

    &::before {
        content: '';
        width: var(--size);
        height: var(--size);
        border: 3px solid #fff;
        border-right-color: #AA97EC;
        border-radius: 50%;
        animation: rotate .8s linear infinite;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
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