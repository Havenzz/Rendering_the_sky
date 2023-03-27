<template>
    <container>
        <template #header>
            <div class="header">
                <router-link class="back" to="/articles">
                    <i class="iconfont">&#xe7ec;</i> 返回 Articles
                </router-link>
                <div class="user" v-if="username === article.uploader">
                    <span v-if="!article.isTop" @click="onSetTopArticle" class="edit">
                        <i class="iconfont">&#xe86e;</i> 置顶
                    </span>
                    <span v-else @click="onCancelTopArticle" class="edit">
                        <i class="iconfont">&#xe86e;</i> 取消置顶
                    </span>
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
            <h1 class="title">
                {{ article.title }}
                <div>
                    <span><i class="iconfont">&#xe62e;</i> {{ dayjs(article.createTime).format('YYYY-MM-DD') }}</span>
                    <span>字数 ≈ {{ wordCount }} 字</span>
                    <span>阅读时长 ≈ {{ formatTime(Math.ceil(wordCount / 6)) }}</span>
                </div>
            </h1>
            <div class="info">
                <p>最后编辑于：{{ dayjs(article.editTime).format('YYYY-MM-DD') }}</p>
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
import dayjs from 'dayjs'

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
const wordCount = ref<number>(0)

onMounted(() => {
    store.dispatch('getArticle',route.params.id).then(res => {
        article.value = res.data.data;
        nextTick(() => {
            contentRef.value?.querySelectorAll('pre').forEach(item => {
                item.innerHTML = `<code>${item.innerHTML}</code>`
            })
            prism.highlightAll()
            wordCount.value = Math.ceil(contentRef.value!.innerText.length / 2)
        })
    })
})

const onSetTopArticle = () => {
    if(article.value.id){
        createConfirm(`确定要将 “${article.value.title}” 设为置顶吗？`,() => {
            store.dispatch('setTopArticle',article.value.id)
            router.push('/articles')
        })
    }
}

const onCancelTopArticle = () => {
    if(article.value.id){
        createConfirm(`确定要将 “${article.value.title}” 取消置顶吗？`,() => {
            store.dispatch('cancleTopArticle')
            router.push('/articles')
        })
    }
}

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

// 阅读时间估算
function formatTime(time:number) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time - hours * 3600) / 60);
  let seconds = time % 60;

  let parts = [];
  if (hours > 0) {
    parts.push(` ${hours} 小时`);
  }
  if (minutes > 0 || (hours > 0 && seconds > 0)) {
    parts.push(` ${minutes} 分`);
  }
  if (seconds > 0 || (hours === 0 && minutes === 0)) {
    parts.push(` ${seconds} 秒`);
  }

  return parts.join('');
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
    text-align: center;
    padding-bottom: 13px;
    border-bottom: 1px solid rgba(255, 255, 255, .3);
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 14px;
        font-weight: normal;
        span{
            margin: 0 15px;
        }
    }
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