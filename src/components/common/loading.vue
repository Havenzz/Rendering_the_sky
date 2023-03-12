<template>
    <div class="common_loading" v-bind="$attrs">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    inheritAttrs:false
})
</script>

<style lang="less" scoped>
.common_loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    --size: 50px;

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
</style>