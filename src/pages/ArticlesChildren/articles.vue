<template>
    <div class="articles_wrap">
        <h1 class="searchResult" v-if="route.query.s">以下是关于 "{{ route.query.s }}" 的内容：</h1>
        <loading :style="{height: 301 + 'px'}" v-if="isLoading"></loading>
        <div class="not_found" v-else-if="articles.length === 0">
            <div class="cube">
                <div v-for="n of 3"></div>
            </div>
            <span>(●'◡'●) 空空如也，点击<router-link to="/articles">返回</router-link>上一级</span>
        </div>
        <template v-else>
            <template v-for="(article, index) of articles" :key="index">
                <container class="articles" v-if="index === 0 && !route.query.s && article.isTop">
                    <template #header>
                        <div class="header_title">
                            <router-link to="/articles" v-if="route.query.s"><i class="iconfont">&#xe7ec;</i> 返回 Articles</router-link>
                            <p v-else><i class="iconfont">&#xe86e;</i> 置顶</p>
                            <p>Total: {{ articleTotal }}</p>
                        </div>
                    </template>
                        <div class="pro_item">
                            <router-link class="article" :to="`/articles/${'' + article.id}`">
                                <div class="article_header">
                                    <h3>{{ article.title }}</h3>
                                    <span>@{{ article.uploader }} · {{ dayjs(article?.createTime).format('YYYY年MM月DD日') }}</span>
                                </div>
                                <p>{{ article.describe }}</p>
                                <div class="image_box" v-if="article.imageSrc !== '#'">
                                    <img v-lazy="baseURL + '/' + article.imageSrc">
                                </div>
                            </router-link>
                            <div class="tags">
                                <mbutton v-for="(tag, index) of article.tags">
                                    <router-link 
                                    :to="`/articles?s=${tag.name}`"
                                    :key="index">
                                    <i class="iconfont">&#xe872;</i>
                                    {{ tag.name }}
                                </router-link>
                                </mbutton>
                            </div>
                        </div>
                </container>
                <div class="pro_item" v-else>
                    <router-link class="article" :to="`/articles/${'' + article.id}`">
                        <div class="article_header">
                            <h3>{{ article.title }}</h3>
                            <span>@{{ article.uploader }} · {{ dayjs(article?.createTime).format('YYYY年MM月DD日') }}</span>
                        </div>
                        <p>{{ article.describe }}</p>
                        <div class="image_box" v-if="article.imageSrc !== '#'">
                            <img v-lazy="baseURL + '/' + article.imageSrc">
                        </div>
                    </router-link>
                    <div class="tags">
                        <mbutton v-for="(tag, index) of article.tags">
                            <router-link 
                            :to="`/articles?s=${tag.name}`"
                            :key="index">
                            <i class="iconfont">&#xe872;</i>
                            {{ tag.name }}
                        </router-link>
                        </mbutton>
                    </div>
                </div>
            </template>
        </template>
        <div class="pager_container">
            <pager :pageCount="total || 1" :currentPage="page" @change-page="changePage" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import pager from '../../components/common/pager.vue';
import container from '../../components/common/container.vue';
import { useStore } from 'vuex';
import { Article } from '../../store';
import axios from 'axios';
import loading from '../../components/common/loading.vue';
import { useRouter, useRoute } from 'vue-router';
import mbutton from '../../components/common/mbutton.vue';
import dayjs from 'dayjs';


type Articles = Article[]

export default defineComponent({
    components: {
        pager,
        container,
        loading,
        mbutton
    },
    setup() {
        const baseURL = axios.defaults.baseURL
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const page = ref<number>(1);
        const DEFAULT_TAKE = 5;
        const changePage = (newPage: number) => {
            page.value = newPage;
            const skip = (newPage - 1) * DEFAULT_TAKE;
            if(skip){
                router.push({
                    path:'articles',
                    query:{
                        ...route.query,
                        skip
                    }
                })
            }else{
                router.push('/articles')
            }
            
        }
        const SKIP = 5;
        const articles = computed<Articles>(() => store.state.articles)
        const articleTotal = computed<number>(() => store.state.articleTotal)
        const total = computed<number>(() => Math.ceil(articleTotal.value / SKIP))
        const isLoading = computed(() => store.state.isLoading)

        watch(route, newValue => {
            if(route.path === '/articles'){
                store.dispatch('searchArticles',newValue.query)
                if(newValue.query.skip){
                    page.value = +newValue.query.skip / DEFAULT_TAKE + 1
                }
            }
        },{ immediate:true })

        return {
            articles,
            page,
            changePage,
            baseURL,
            total,
            isLoading,
            route,
            articleTotal,
            dayjs
        }
    }
})
</script>

<style scoped lang="less">
.pro_item {
    min-height: 140px;
    padding: 20px 20px 10px;
    margin-bottom: 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, .3);
    box-shadow: 0 0 8px rgba(0, 0, 0, .3);
    transition: box-shadow .3s;
    &:hover{
        box-shadow: 0 0 8px rgba(0, 0, 0, .6);
    }
    .image_box{
        width: 100%;
        margin: 10px 0 0;
        box-sizing: border-box;
        img{
            width: 100%;
        }
    }

    .tags {
        margin: 15px 0 10px;
        display: flex;
        a{
            color: var(--white);
        }
    }
}

@media screen and (max-width:1000px) {
    margin-left: 0;
}

.article {
    display: block;
    margin-bottom: 10px;
    
    .article_header{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 12px;
        span{
            color: var(--white);
            font-size: 12px;
            padding-bottom: 6px;
            align-self: end;
        }
    }

    h3 {
        max-width: 350px;
        font-size: 18px;
        width: max-content;
        margin: 4px 10px 0 0;
        color: var(--lightblue);
        border-bottom: 1px solid transparent;
        padding-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: .3s;
    }

    p {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.87);
        overflow: hidden;
        text-overflow:ellipsis;
        -webkit-line-clamp: 2;
    }

    &:hover h3 {
        border-bottom-color: var(--lightblue);
    }
}
.articles_wrap{
    flex: 1;
    width: 100%;
}
.articles {
    .pro_item{
        background-color: transparent;
        box-shadow: none;
        transition: none;
        margin-bottom: 0;
        &:hover{
            box-shadow: none;
        }
    }
    :deep(.log-container-content){
        padding: 0;
    }
    
}
.not_found{
    width: 100%;
    height: 300px;
    position: relative;
    background-color: rgba(0, 0, 0, .3);
    box-shadow: 0 0 8px rgba(0, 0, 0, .3);
    margin-bottom: 30px;
    overflow: hidden;
    span{
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 16px;
        a{
            margin: 0 5px;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    .cube{
        height: 300px;
        transform: rotateX(-25deg) rotateY(-40deg);
        transform-style: preserve-3d;
        div{
            width: 100px;
            height: 100px;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 80px;
            margin: auto;
            transition: .3s;
            cursor: pointer;
            box-sizing: border-box;
            border: 1px solid transparent;
            user-select: none;
        }
        div:nth-child(1){
            transform: rotateX(90deg) translateZ(50px);
            background-color: #eeeeee;
        }
        div:nth-child(2){
            transform: translateZ(50px);
            background-color: #fff;
        }
        div:nth-child(3){
            transform: rotateY(90deg) translateZ(50px);
            background-color: #dcdcdc;
        }
        div:hover{
            background-color: transparent;
            border-color: #fff;
        }
    }
}
.searchResult{
    font-size: 24px;
    margin-bottom: 30px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .3);
    line-height: 34px;
    background-color: rgba(0, 0, 0, .3);
    padding: 15px 20px;
}
.header_title{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    a{
        color: #fff;
        transition: .3s;
        font-weight: 200;
        &:hover{
            text-shadow: 0 0 12px;
        }
    }
}
.pager_container{
    background-color: rgba(0, 0, 0, .3);
    padding: 2px 10px;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .3);
}
</style>