<template>
    <div class="search_input">
        <input type="text">
        <button><i class="iconfont icon-zidingyi"></i></button>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.search_input {
    position: relative;
    display: flex;
    align-items: center;

    input {
        outline: none;
        box-sizing: border-box;
        border: none;
        background-color: rgba(255, 255, 255, .33);
        width: 100%;
        border-radius: 5px;
        font-size: 16px;
        height: 36px;
        padding: 0 34px 0 10px;
        border: 1px solid transparent;
        transition: .3s;

        &:hover,
        &:focus {
            border-color: #AA97EC;
        }
    }

    button {
        padding: 4px 8px;
        background-color: transparent;
        font-size: 14px;
        flex-shrink: 0;
        border: none;
        transition: color .3s;
        position: absolute;
        right: 0;

        i {
            font-size: 18px;
        }

        &:hover {
            color: #fff;
        }
    }
}
</style>