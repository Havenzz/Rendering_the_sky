<template>
    <container>
        <template #header>
            <div class="header">
                <router-link class="back" to="/articles">
                    <i class="iconfont">&#xe7ec;</i> 返回 Articles
                </router-link>
                <div class="user" v-if="username === article.uploader">
                    <span @click="onEditArticle" class="edit">
                        <i class="iconfont">&#xe871;</i> 设置
                    </span>
                    <span @click="onRemoveArticle">
                        <i class="iconfont">&#xe863;</i> 删除
                    </span>
                </div>
            </div>
        </template>
        <loading :style="{height: 666 + 'px'}" v-if="isLoading"></loading>
        <template v-else>
            <div v-if="article.imageSrc && article.imageSrc !== '#'" class="image">
                <img v-lazy="baseURL + '/' + article.imageSrc">
            </div>
            <h1 class="title">{{ article.title }}</h1>
            <div class="info">
                <p>上传者：{{ article.uploader }}</p>
                <p>时间：{{ article.createTime?.split('T')[0] }}</p>
                <p class="tags">文章标签：
                    <router-link :to="`/articles?s=${tag.name}`" v-for="tag of article.tags" :key="tag.id">{{ tag.name }}</router-link>
                </p>
            </div>
            <div ref="contentRef" class="tinymce_content content line-numbers" v-html="article.content"></div>
        </template>
    </container>
</template>

<script lang="ts" setup>
import prism from 'prismjs';
import { onMounted, ref, computed, nextTick } from 'vue';
import container from '../../components/common/container.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Article } from '../../store';
import loading from '../../components/common/loading.vue';
import createConfirm from '../../components/common/createConfirm';
import axios from 'axios';

interface WholeArticle extends Article {
    content:string;
}

const route = useRoute()
const router = useRouter()
const store = useStore()
const baseURL = axios.defaults.baseURL
const contentRef = ref<HTMLElement | null>(null)

const article = ref<WholeArticle | any>({})
const isLoading = computed(() => store.state.isLoading)
const username = computed(() => store.state.user.username)

onMounted(() => {
    store.dispatch('getArticle',route.params.id).then(res => {
        article.value = res.data.data;
        nextTick(() => {
            contentRef.value?.querySelectorAll('pre').forEach(item => {
                item.innerHTML = `<code>${item.innerHTML}</code>`
            })
            prism.highlightAll()
        })
    })
})

const onRemoveArticle = () => {
    if(article.value.id){
        createConfirm(`确定要删除 “${article.value.title}” 吗？`,() => {
            store.dispatch('deleteArticle',article.value.id)
            router.push('/articles')
        })
    }
}
const onEditArticle = () => {
    if(article.value.id){
        createConfirm(`确定要编辑 “${article.value.title}” 吗？`,() => {
            router.push(`/articles/edit/${article.value.id}`)
        })
    }
}
</script>

<style scoped lang="less">
.back {
    color: var(--white);
    font-weight: 200;
    transition: .3s;
    &:hover{
        color: #fff;
        text-shadow: 0 0 12px;
    }
}
.header{
    display: flex;
    .user{
        margin-left: auto;
        a,span{
            color: var(--white);
            transition: .3s;
            &:hover{
                color: #fff;
                text-shadow: 0 0 12px;
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
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 30px;
    margin: 20px 0;
    color: #fff;
}
.image{
    width: 100%;
    margin: 10px 0 10px;
    img{
        width: 100%;
    }
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
    padding: 4px 16px;
    border-radius: 8px;
    margin: 20px 0;
    line-height: 24px;
}
</style>