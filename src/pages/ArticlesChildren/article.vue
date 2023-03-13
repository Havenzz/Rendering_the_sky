<template>
    <container>
        <template #header>
            <div class="header">
                <router-link class="back" to="/articles"> ⬅ Go back</router-link>
                <div class="user" v-if="username === article.uploader">
                    <router-link class="edit" :to="`/articles/edit/${article.id}`">编辑</router-link>
                    <span>删除</span>
                </div>
            </div>
        </template>
        <loading :style="{height: 666 + 'px'}" v-if="isLoading"></loading>
        <template v-else>
            <h1 class="title">{{ article.title }}</h1>
            <div class="info">
                <p>上传者：{{ article.uploader }}</p>
                <p>时间：{{ article.createTime?.split('T')[0] }}</p>
                <p class="tags">文章标签：
                    <a href="javascript:;" v-for="tag of article.tags" :key="tag.id">{{ tag.name }}</a>
                </p>
            </div>
            <div class="content" v-html="article.content"></div>
        </template>
    </container>
</template>

<script lang="ts" setup>
import prism from 'prismjs';
import { onMounted, ref, computed } from 'vue';
import container from '../../components/common/container.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Article } from '../../store';
import loading from '../../components/common/loading.vue';

interface WholeArticle extends Article {
    content:string;
}

const route = useRoute()
const store = useStore()

const article = ref<WholeArticle | any>({})
const isLoading = computed(() => store.state.isLoading)
const username = computed(() => store.state.user.username)

onMounted(() => {
    store.dispatch('getArticle',route.params.id).then(res => {
        article.value = res.data.data;
        prism.highlightAll()
    })
})
</script>

<style scoped lang="less">
.back {
    color: #fff;
}
.header{
    display: flex;
    .user{
        margin-left: auto;
        a,span{
            color: var(--white);
            &:hover{
                color: #fff;
                text-shadow: 0 0 8px;
            }
        }
        span{
            margin-left: 5px;
            cursor: pointer;
        }
    }
}
.title {
    line-height: 40px;
    font-size: 30px;
    margin: 20px 0;
    color: #fff;
}

.info {
    display: flex;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, .3);
    flex-wrap: wrap;

    p+p {
        margin-left: 60px;
    }

    .tags a {
        margin-right: 8px;
    }

    @media screen and (max-width:850px) {
        flex-direction: column;

        p+p {
            margin: 0;

            &:nth-child(2) {
                margin: 20px 0;
            }
        }
    }
}

.reproduced {
    margin: 20px 0 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--darkblue);
    span{
        color: var(--white);
    }
}

.content {
    background-color: rgba(0, 0, 0, .3);
    color: #fff;
    padding: 14px;
    border-radius: 8px;
    margin: 20px 0;
    line-height: 24px;
}
</style>