<template>
    <div class="home">
        <threeHome />
        <div ref="textBox" class="textBox">
            <h1></h1>
            <h1>to</h1>
            <h1>Haven's</h1>
            <h1>blog!</h1>
            <div class="btn_container">
                <button @click="goInfoRoute">进入博客</button>
            </div>
        </div>
    </div>
    <info></info>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import threeHome from '../components/home/threeHome.vue';
import info from './Info.vue'
import { ref, onMounted } from 'vue';

const router = useRouter()
const textStrArr = ['Welcome','to',"haven's",'blog!']
const textBox = ref<null | HTMLElement>(null)
onMounted(() => {
    const textDomArr = Array.from((textBox.value as HTMLElement).children);
    for (const textDom of textDomArr) {
        for (const textStr of textStrArr) {
            let i = 0;
            let timer = setInterval(() => {
                if(i === textStr.length){
                    clearInterval(timer)
                    return
                }
                textDom.textContent += textStr[i]
                i++
            },100)
        }
    }
})
const goInfoRoute = () => {
    router.push('/articles')
}
</script>

<style scoped lang="less">
.home {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    display: flex;
    padding-top: 66px;
    box-sizing: border-box;
    height: 100vh;
}

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

.textBox {
    position: absolute;
    top: 16%;
    right: 66px;
    overflow: hidden;
    padding: 10px;
    user-select: none;
    box-sizing: border-box;


    h1 {
        &::before{
            content: '.';
            visibility: hidden;
        }
        font-size: 110px;
        color: #aa97ec;
        text-align: end;
        text-shadow: 2px 2px 0px #d89aeb, 4px 4px 0px #e0bede;

        @media screen and (max-width:900px) {
            text-shadow: 1px 1px 0px #d89aeb, 2px 2px 0px #e0bede;
        }
    }

    .btn_container {
        margin-top: 66px;
        display: flex;
        justify-content: end;

        button {
            margin: 10px;
            padding: 16px 20px;
            background-color: rgba(6, 6, 6, 0.66);
            box-shadow: 0px 3px 7px 0px rgb(0 0 0 / 35%);
            text-shadow: 0 0 3px #a189e2, 0 0 6px #e0b5eb, ;
            color: #fff;
            outline: none;
        }
    }

    @media screen and (max-width: 1200px) {
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        top: 100%;
        width: 800px;
        margin: 0 auto;
        left: 0;
        right: 0;

        h1 {
            font-size: 56px;
            margin-right: 20px;
            text-align: center;
        }

        .btn_container {
            margin: 0 auto;
            display: block;
            width: 100%;
            text-align: center;
        }
    }

    @media screen and (max-width: 800px) {
        width: 100%;

        h1 {
            font-size: 42px;
        }
    }

    @media screen and (max-width: 520px) {
        top: 105%;

        h1 {
            font-size: 28px;
            margin-right: 10px;
        }

        .btn_container {
            margin: 20px auto 0;
            display: block;
            width: 100%;
            text-align: center;
        }
    }
}
</style>