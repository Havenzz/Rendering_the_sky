<template>
    <container class="articles" title="Articles">
        <div class="pro_item" v-for="(article, index) of articles" :key="index">
            <router-link class="article" :to="`/articles/${'' + article.id}`">
                <div class="article_header">
                    <h3>{{ article.title }}</h3>
                    <span>Uploader: {{ article.uploader }} / {{ article.createTime.split('T')[0] }}</span>
                </div>
                <p>{{ article.describe }}</p>
                <div class="image_box" v-if="article.imageSrc !== '#'">
                    <img :src="baseURL + '/' + article.imageSrc">
                </div>
            </router-link>
            <div class="tags">
                <router-link 
                v-for="(tag, index) of article.tags"
                :to="`/articles?s=${tag.name}`"
                :key="index">{{ tag.name
                }}</router-link>
            </div>
        </div>
        <pager :pageCount="total || 1" :currentPage="page" @change-page="changePage" />
    </container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import pager from '../../components/common/pager.vue';
import container from '../../components/common/container.vue';
import { useStore } from 'vuex';
import { Article } from '../../store';
import axios from 'axios';


type Articles = Article[]

export default defineComponent({
    components: {
        pager,
        container
    },
    setup() {
        const baseURL = axios.defaults.baseURL
        const store = useStore()
        const page = ref<number>(1);
        const changePage = (newPage: number) => {
            page.value = newPage;
        }
        const SKIP = 5;
        const articles = computed<Articles>(() => store.state.articles)
        const total = computed<number>(() => Math.ceil(store.state.articleTotal / SKIP))

        return {
            articles,
            page,
            changePage,
            baseURL,
            total
        }
    }
})
</script>

<style scoped lang="less">
.articles {
    flex: 1;
    .pro_item {
        min-height: 160px;
        border-bottom: 1px solid #fff;
        padding: 20px 10px 0;
        box-sizing: border-box;
        .image_box{
            width: 208px;
            height: 130px;
            margin: 10px 0 0;
            box-sizing: border-box;
            img{
                width: 100%;
            }
        }

        .tags {
            margin-bottom: 10px;
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
            span{
                color: var(--white);
                font-size: 12px;
                padding-bottom: 6px;
            }
        }

        h3 {
            max-width: 350px;
            font-size: 18px;
            width: max-content;
            margin-bottom: 10px;
            margin-right: 20px;
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
            height: 40px;
            overflow: hidden;
            text-overflow:ellipsis;
            -webkit-line-clamp: 2;
        }

        &:hover h3 {
            border-bottom-color: var(--lightblue);
        }
    }
}
</style>