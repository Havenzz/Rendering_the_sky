<template>
    <div class="navBar">
        <div class="mask" :class="{ show: asideShow }" @click="onClickHide"></div>
        <div class="header-left-small" @click="onClickShow">
            <i class="iconfont">&#xe7f4;</i>
        </div>
        <div class="header-left">
            <div class="ufo" :style="{ left: `${ufoOffset}%` }"></div>
            <div class="header-navbar" :class="{ show: asideShow }" ref="headerNavbarRef">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const headerNavbarRef = ref<Ref | null>(null);
const ufoOffset = ref(0);
const asideShow = ref(false);

const changeOffset = () => {
    const elArr = Array.from(headerNavbarRef.value.children);
    // 初始偏移值 = 当前路由在导航栏列表中的索引 * 导航栏列表的单个占比
    ufoOffset.value = elArr.findIndex((el: HTMLAnchorElement | unknown) => {
        const checkStr = (el as HTMLAnchorElement).attributes.getNamedItem('href')?.value;
        if (checkStr) {
            return route.path.indexOf(checkStr) !== -1;
        }
    }) * (100 / elArr.length);

    if (ufoOffset.value < 0) {
        ufoOffset.value = 0
    }

    return elArr
}

const onClickShow = () => {
    asideShow.value = true;
    document.body.style.overflow = 'hidden';
}
const onClickHide = () => {
    asideShow.value = false;
    document.body.removeAttribute('style')
}

onMounted(async () => {
    await router.isReady();
    const elArr = changeOffset();
    elArr.forEach((el: HTMLElement | unknown, index: number) => {
        (el as HTMLElement).addEventListener('mouseover', () => {
            ufoOffset.value = 100 / elArr.length * index
        });
        (el as HTMLElement).addEventListener('mouseleave', () => {
            changeOffset()
        });
    });

})

watch(() => route.path, () => {
    changeOffset()
    onClickHide()
})

</script>

<style lang="less" scoped>
.header-left-small {
    display: none;
    background: linear-gradient(150deg, #a189e2, #e0b5eb);
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 20px;
    i{
        font-size: 22px;
    }

    @media screen and (max-width:1200px) {
        display: block;
    }
}

.header-left {
    position: relative;
    height: 100%;

    .ufo {
        position: absolute;
        left: 0;
        top: 0;
        width: calc(33.3333% - 60px);
        height: 6px;
        background: var(--linear);
        ;
        margin-left: 30px;
        transition: .3s;
        user-select: none;
        z-index: 1;

        @media screen and (max-width:1200px) {
            display: none;
        }
    }
}

.header-navbar {
    display: flex;
    font-size: 17px;
    word-spacing: 1px;
    list-style-type: none;

    @media screen and (max-width:1200px) {
        flex-direction: column;
        z-index: 9999;
        position: fixed;
        top: 66px;
        left: 0;
        width: 100%;
        background-color: rgba(6, 6, 6, .8);
        box-shadow: 0px 3px 7px 0px rgb(0 0 0 / 35%);
        justify-content: center;
        opacity: 0;

        &.show {
            opacity: 1;
            transform: translateX(0);
        }

        :deep(a) {
            text-align: center;
        }
    }

    :deep(a) {
        padding: 0 30px;
        letter-spacing: 0px;
        color: #ccc;
        line-height: 66px;
        z-index: 9;

        &.active,
        &:hover {
            text-shadow: 0 0 10px #a189e2, 0 0 20px #e0b5eb, 0 0 40px #e0b5eb;
            color: #fff;
        }
    }
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9;
    display: none;

    &.show {
        display: block;
    }

    @media screen and (min-width:1200px) {
        &.show {
            display: none;
        }
    }
}
</style>