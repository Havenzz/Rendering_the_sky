<template>
    <div class="search_input">
        <input v-model="inpVal" type="text">
        <button @click="onFetchArticles">
            <i class="iconfont">&#xe8ef;</i>
            <i class="iconfont">&#xe8ef;</i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import createMessage, { MESSAGE_DELAY } from '../common/createMessage';

const inpVal = ref<string>('')
const route = useRoute()
const router = useRouter()

const onFetchArticles = () => {
    if (inpVal.value.trim() !== '') {
        router.push({
            path:'articles',
            query:{
                s:inpVal.value
            }
        })
        inpVal.value = ''
    } else if(inpVal.value.trim() === '' && route.query.s){
        router.push('articles')
    } else {
        createMessage('请输入文字再后搜索','error',MESSAGE_DELAY)
    }
}
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
        padding: 0 8px 4px;
        background-color: transparent;
        height: 30px;
        font-size: 14px;
        flex-shrink: 0;
        border: none;
        transition: color .3s;
        position: absolute;
        right: 0;
        outline: none;
        color: #333;
        overflow: hidden;
        i {
            display: block;
            font-size: 22px;
            flex-shrink: 0;
            transition: .3s;
            line-height: 30px;
        }
        i + i{
            color: #fff;
        }

        &:hover {
            i{
                transform: translateY(-100%);
                text-shadow: 0 0 12px;
            }
        }
    }
}
</style>