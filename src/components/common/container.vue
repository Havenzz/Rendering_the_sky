<template>
    <div class="log-container">
        <div class="log-container-header">
            <slot name="header">{{ title }}</slot>
        </div>
        <div class="log-container-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props:{
        title:{
            type:String,
            default: '#'
        }
    }
})
</script>

<style scoped lang="less">
.log-container {
    width: 100%;
    position: relative;
    background-position: top left;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);
    border-radius: 3px;
    padding: 0px 0px 0px 0px;
    margin-bottom: 22px;
    font-size: 13px;
    overflow: hidden;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    transition: .3s;
    &:hover{
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
    }
    .log-container-header {
        font-family: "Motiva Sans", Sans-serif;
        font-weight: 200;
        background: var(--color-showcase-header);
        background: linear-gradient(90deg, rgba(66, 90, 228, 0.247) 0%, rgba(101, 85, 110, 0.93) 90%);
        padding: 5px 10px 5px 10px;
        color: #ffffff;
        font-size: 16px;
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .log-container-content {
        position: relative;
        border-radius: 5px;
        padding: 20px 10px 11px 10px;
        margin-bottom: 0px;
        font-size: 13px;
        overflow: hidden;
    }
}
</style>