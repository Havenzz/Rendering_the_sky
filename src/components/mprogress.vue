<template>
    <div v-show="isShow" class="mprogress" :style="{ width: width + '%' }"></div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref, watch } from 'vue';

interface props {
    progress: number
}
const props = defineProps<props>();
const width = ref<number>(0);


let timer:NodeJS.Timer;
const DEFAULT_TIME = 300;
const DEFAULT_SPEED = 10;

watch(() => props.progress, () => {
    const prog = props.progress * 100;
    if(timer){
        clearInterval(timer)
    }
    if(!props.progress){
        width.value = 0;
    }
    timer = setInterval(() => {
        if(width.value >= prog){
            clearInterval(timer)
        }else{
            width.value += prog / ( DEFAULT_TIME / DEFAULT_SPEED )
        }
    },DEFAULT_SPEED)
})

const isShow = computed(() => {
    return !!props.progress
});
</script>

<style scoped lang="less">
.mprogress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 6px;
    background: var(--linear);
    z-index: 99999;
    transition: .3s;
}
</style>