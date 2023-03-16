<template>
    <container class="articles">
        <template #header>
            <div class="header_title">
                <router-link to="/articles" v-if="route.query.s"><i class="iconfont">&#xe7ec;</i> 返回 Articles</router-link>
                <p v-else><i class="iconfont">&#xe86e;</i> Articles</p>
                <p>Total: {{ articleTotal }}</p>
            </div>
        </template>
        <h1 class="searchResult" v-if="route.query.s">以下是 "{{ route.query.s }}" 的搜索结果：</h1>
        <loading :style="{height: 301 + 'px'}" v-if="isLoading"></loading>
        <div class="not_found" v-else-if="articles.length === 0">
            <div class="cube">
                <div v-for="n of 3"></div>
            </div>
            <span>(●'◡'●) 空空如也，点击<router-link to="/articles">返回</router-link>上一级</span>
        </div>
        <template v-else>
            <div class="pro_item" v-for="(article, index) of articles" :key="index">
                <router-link class="article" :to="`/articles/${'' + article.id}`">
                    <div class="article_header">
                        <h3>{{ article.title }}</h3>
                        <span>@{{ article.uploader }} · {{ article?.createTime.split('T')[0].replace('-','年').replace('-','月') + '日' }}</span>
                    </div>
                    <p>{{ article.describe }}</p>
                    <div class="image_box" v-if="article.imageSrc !== '#'">
                        <img v-lazy="baseURL + '/' + article.imageSrc">
                    </div>
                </router-link>
                <div class="tags">
                    <router-link 
                    v-for="(tag, index) of article.tags"
                    :to="`/articles?s=${tag.name}`"
                    :key="index">
                    <i class="iconfont">&#xe872;</i>
                    {{ tag.name }}
                </router-link>
                </div>
            </div>
        </template>
        <pager :pageCount="total || 1" :currentPage="page" @change-page="changePage" />
    </container>
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


type Articles = Article[]

export default defineComponent({
    components: {
        pager,
        container,
        loading
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
            articleTotal
        }
    }
})
</script>

<style scoped lang="less">
.articles {
    flex: 1;
    .pro_item {
        min-height: 140px;
        border-bottom: 1px solid #fff;
        padding: 20px 10px 0;
        box-sizing: border-box;
        .image_box{
            width: 100%;
            margin: 10px 0 0;
            box-sizing: border-box;
            img{
                width: 100%;
            }
        }

        .tags {
            margin: 10px 0 15px;
            display: flex;

            a {
                margin: 0 4px;
                background-color: #20252e;
                padding: 2px 11px;
                text-align: center;
                height: 30px;
                line-height: 30px;
                font-size: 13px;
                color: #D3D3D3;
                border: none;
                transition: .3s;
                border-radius: 6px;

                &:hover {
                    box-shadow: 0 0 8px 2px rgba(0, 0, 0, .1);
                    color: #fff;
                    background-color: #353E4E;
                }

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
}
.not_found{
    height: 300px;
    border-bottom: 1px solid #fff;
    position: relative;
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
    margin: 30px 10px 6px;
    line-height: 34px;
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
</style>