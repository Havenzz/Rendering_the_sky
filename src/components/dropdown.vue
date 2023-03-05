<template>
    <div class="dropdown">
        <div class="dropdown_header" @click="toggle">
            <slot name="header"></slot>
        </div>
        <transition name="fade" appear>
            <div class="dropdown_content" v-show="isOpen">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const isOpen = ref<boolean>(false);

const toggle = () => {
    isOpen.value = !isOpen.value
}

</script>

<style lang="less" scoped>
.dropdown {
    position: relative;
    user-select: none;
    .dropdown_header {
        cursor: pointer;
        max-width: 200px;
        overflow: hidden;
    }

    .dropdown_content {
        box-sizing: border-box;
        position: absolute;
        top: 114%;
        right: 0;
        background-color: rgba(0, 0, 0, .66);
        padding: 6px 0;
        border-radius: 10px;
        transition: all .3s;
        opacity: 1;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-25%);
    }


}
</style>