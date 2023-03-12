<template>
    <teleport to='#message'>
        <transition appear name="fade">
            <div v-if="isVisible" class="message" :class="classObj">
                {{ props.message }}
                <i @click="close" class="iconfont">&#xeb6a;</i>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, ref, onBeforeUnmount } from 'vue';
import useCreateAndRemoveDOM from '../../hook/useCreateAndRemoveDOM';
interface props {
    type: 'success' | 'error' | 'default';
    message: string;
    timeout?: number;
}
useCreateAndRemoveDOM('message')

const props = withDefaults(defineProps<props>(), {
    type: 'default',
    message: 'unknown',
})
const emit = defineEmits<{
    (e: 'close', value: boolean): void
}>()

const classObj: any = {};

classObj[props.type] = true;

const isVisible = ref<boolean>(true);

const close = () => {
    isVisible.value = false;
    emit('close', true);
}

if(props.timeout){
    const timeout = props.timeout > 1000 ? props.timeout - 600 : props.timeout
    setTimeout(() => {
        isVisible.value = false;
    }, timeout);
}

</script>

<style scoped lang="less">
.message {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
    height: 32px;
    line-height: 32px;
    min-width: 50px;
    z-index: 99999;
    padding: 4px 40px 4px 20px;
    text-align: center;
    background-color: #fff;
    color: #000;
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    transition: .6s;

    i {
        position: absolute;
        right: 10px;
        font-size: 12px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 18px;
        cursor: pointer;
    }

    &.success {
        border-color: #C3E6CB;
        background-color: #D4EDDA;
        color: #155724;
    }

    &.error {
        border-color: #F5C6CB;
        background-color: #F8D7DA;
        color: #B75B24;
    }

    &.default {
        border-color: #D6D8DB;
        background-color: #E2E3E5;
        color: #383D41;
    }

    &.fade-enter-from,
    &.fade-leave-to {
        opacity: 0;
        transform: translateY(-100%) translateX(-50%);
    }
}
</style>



