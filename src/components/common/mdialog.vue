<template>
    <teleport to='#back'>
        <transition appear>
            <div class="mdialog" :style="{ width }">
                <div class="mdialog_content">
                    <div class="header">
                        <slot name="header">
                            <h2 class="title">{{ title }}</h2>
                        </slot>
                        <i class="iconfont" @click="close">&#xe7fc;</i>
                    </div>
                    <slot></slot>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue';
import useCreateAndRemoveDOM from '../../hook/useCreateAndRemoveDOM';
useCreateAndRemoveDOM('back')
withDefaults(defineProps<{
    width?: string;
    title?: string;
}>(), {
    width: '375px',
    title: 'unknonw',
})
const emit = defineEmits<{
    (e: 'handleClose'): void
}>()

const close = () => {
    emit('handleClose')
}

</script>

<style lang="less" scoped>
.mdialog {
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #141517;
    border-radius: 8px;
    padding: 2px;
    overflow: hidden;
    color: #000;
    transition: .6s;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #1c1c1c;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        i {
            margin-right: 12px;
            margin-bottom: 2px;
            font-size: 20px;
            cursor: pointer;
            color: var(--white);
        }
    }

    .mdialog_content {
        background: #28292d;
        border-radius: 8px;
        z-index: 2;
        display: flex;
        flex-direction: column;
    }

    &.v-enter-from,
    &.v-leave-to {
        opacity: 0;
        transform: translateY(-100%) translateX(-50%);
    }

    @media screen and(max-width: 767px) {
        width: 90% !important;
    }
}
.title {
    font-size: 18px;
    padding: 12px;
    color: var(--white);
    width: 100%;
}
</style>