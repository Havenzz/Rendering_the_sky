<template>
    <div class="wrap">
        <div class="aside">
            <div class="haven">

            </div>
            <h2 class="date">{{ time }}</h2>
            <container class="search" title="Search">
                <template #header>
                    <search></search>
                </template>
                <ul class="classification">
                    <h1 class="tags_title">
                        <i class="iconfont">&#xe86f;</i> 标签集
                    </h1>
                    <loading v-if="isLoading" :style="{height: 200 + 'px'}"></loading>
                    <template v-else>
                        <li v-for="tag of tags" :key="tag.id">
                            <router-link :to="`articles?s=${tag.name}`">{{ tag.name }}</router-link>
                        </li>
                    </template>
                </ul>
            </container>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import container from '../components/common/container.vue';
import search from '../components/articles/search.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import loading from '../components/common/loading.vue';

const store = useStore();
const time = computed(() => {
    const date = new Date(store.getters.time)
    const MM = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${date.getFullYear()}.${MM}.${DD}`
})

const tags = computed(() => store.state.tags);
const isLoading = computed(() => store.state.isLoading)

onMounted(() => {
    store.dispatch('getTags')
})

</script>

<style scoped lang="less">
.wrap {
    max-width: 1100px;
    margin: 100px auto 50px;
    display: flex;
    align-items: start;
    background: radial-gradient(farthest-side at top right, rgba(109, 38, 44, 0.301), transparent 500px), radial-gradient(farthest-corner at top left, rgba(50, 255, 193, 0.103), transparent 600px), radial-gradient(farthest-corner at bottom right, rgba(109, 38, 44, 0), transparent 500px), radial-gradient(farthest-corner at bottom left, rgba(50, 255, 193, 0.103), transparent 600px);
    background-color: rgba(43, 45, 68, 0.93);
    background-repeat: no-repeat;
    background-position: center;
    box-sizing: border-box;
    padding: 25px 15px;
    display: flex;
    position: relative;
    

    @media screen and (max-width:1000px) {
        width: 100%;
        flex-direction: column;
    }

    .search {
        width: 280px;

        .classification {
            padding: 10px 20px;

            li {
                line-height: 25px;
                list-style: disc;
                a{
                    display: block;
                    color: var(--white);
                    transition: text-shadow .3s;
                    width: 100%;
                    height: 100%;
                }
                a:hover {
                    color: #fff;
                    text-shadow: 0 0 13px;
                }
            }
        }

        @media screen and (max-width:1000px) {
            width: 100%;
        }
    }
}

.aside {
    margin-right: 30px;
    .haven{
        height: 300px;
        background-color: rgba(0, 0, 0, .3);
        margin-bottom: 20px;
    }

    @media screen and (max-width:1000px) {
        width: 100%;
        margin-right: 0;
        .haven{
            display: none;
        }
    }
}

.date {
    text-align: center;
    max-width: 230px;
    padding: 0 0 20px;
    margin: 0 auto;
    color: var(--purple);
    margin-bottom: 20px;
    font-size: 36px;
    text-shadow: 1px 1px 0px var(--darkpink), 2px 2px 0px var(--pink);
    border-bottom: 2px solid;
}


:deep(.log-container) {
    .log-container-content {
        padding-top: 0;
        padding-bottom: 0;
    }

    &.search .log-container-content {
        @media screen and (max-width:1000px) {
            display: none;
        }
    }
}
.tags_title{
    font-size: 24px;
    width: fit-content;
    margin: 0 auto 20px;
    user-select: none;
    padding: 8px 30px 8px 24px;
    border-bottom: 1px solid;
    i{
        font-size: 24px;
    }
}
</style>