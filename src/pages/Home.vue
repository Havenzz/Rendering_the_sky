<template>
    <div class="home_container">
        <div class="home">
            <threeHome />
            <div ref="textBox" class="textBox">
                <h1></h1>
                <h1></h1>
                <h1></h1>
                <h1></h1>
                <div class="btn_container">
                    <button @click="goInfoRoute">进入博客</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import threeHome from '../components/home/threeHome.vue';
import { ref, onMounted } from 'vue';

const router = useRouter()
const textStrArr = ['Welcome','to',"haven's",'blog!']
const textBox = ref<null | HTMLElement>(null)
onMounted(() => {
    const textDomArr = Array.from((textBox.value as HTMLElement).querySelectorAll('h1'));
    const asyncArr = textDomArr.map((dom,index) => {
        return () => {
            return new Promise(resolve => {
                dom.classList.add('active')
                let i = 0;
                let timer = setInterval(() => {
                    if(i === textStrArr[index].length - 1){
                        clearInterval(timer);
                        dom.classList.remove('active')
                        resolve('')
                    }
                    dom.innerText += textStrArr[index][i]
                    i++;
                },100)
            })
        }
    })
    ;(async () => {
        for (const async of asyncArr) {
            await async()
        }
    })()
})
const goInfoRoute = () => {
    router.push('/articles')
}
</script>

<style scoped lang="less">
.home_container{
    height: 100vh;
}
.home {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    display: flex;
    padding-top: 66px;
    box-sizing: border-box;
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
    top: 18%;
    right: 66px;
    overflow: hidden;
    padding: 10px;
    user-select: none;
    box-sizing: border-box;
    width: 520px;

    h1 {
        width: fit-content;
        font-size: 110px;
        color: #aa97ec;
        text-shadow: 2px 2px 0px #d89aeb, 4px 4px 0px #e0bede;
        &:nth-child(2){
            margin-left: 365px;
        }
        &:nth-child(3){
            margin-left: 75px;
        }
        &:nth-child(4){
            margin-left: 212px;
        }
        &::before{
            content: '.';
            visibility: hidden;
        }
        &.active::after{
            content: '|';
        }

        @media screen and (max-width:1200px) {
            text-shadow: 1px 1px 0px #d89aeb, 2px 2px 0px #e0bede;
            text-align: start;
            &:nth-child(2){
                margin-left: 0;
            }
            &:nth-child(3){
                margin-left: 0;
            }
            &:nth-child(4){
                margin-left: 0;
            }
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
        width: 800px;
        margin: 0 auto;
        top: 105%;
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
            font-size: 36px;
        }
    }

    @media screen and (max-width: 520px) {
        top: 105%;

        h1 {
            font-size: 26px;
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