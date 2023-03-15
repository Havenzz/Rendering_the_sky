<template>
    <div class="wrap">
        <container class="readme">
            <template #header>
                README.md
            </template>
            <p>该项目所使用的技术栈有three.js</p>
        </container>
    </div>
</template>

<script lang="ts" setup>
import container from '../components/common/container.vue';
</script>

<style lang="less">
.wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}
.readme{
    max-width: 900px;
    margin: 0 auto;
}
</style>