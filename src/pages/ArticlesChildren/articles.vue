<template>
    <container class="articles" title="Articles">
        <div class="pro_item" v-for="(article, index) of articles" :key="index">
            <router-link class="article" :to="`/articles/${'' + article.id}`">
                <h3>{{ article.title }}</h3>
                <p>{{ article.content }}</p>
            </router-link>
            <div class="tags">
                <router-link 
                v-for="(tag, index) of article.tags"
                :to="`/articles?s=${tag}`"
                :key="index">{{ tag
                }}</router-link>
            </div>
            <div class="article_info">
                <div class="articles_author">Author：{{ article.author }}</div>
                <div class="articles_date">Date：{{ article.date }}</div>
            </div>
        </div>
        <pager :pageCount="20" :currentPage="page" @change-page="changePage" />
    </container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import pager from '../../components/pager.vue';
import container from '../../components/container.vue';
export interface article {
    title: string;
    content: string;
    tags: string[];
    id: number;
    date: string;
    reproduced?: string;
    author: string
}
type articles = article[]
export default defineComponent({
    components: {
        pager,
        container
    },
    setup() {
        const page = ref(1);
        const changePage = (newPage: number) => {
            page.value = newPage;
        }
        const articles: articles = [{
            title: '[转载] 关于实现token无感刷新的解决方案',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tags: ['jwt', 'axios'],
            id: 1,
            date: '2021-11-27 15:48:20',
            reproduced: 'https://blog.csdn.net/m0_48468380/article/details/121577011',
            author: '老蛙@'
        }, {
            title: 'Vue2的双向数据绑定原理',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tags: ['vue'],
            id: 1,
            date: '2023-03-01',
            author: 'Me'
        }, {
            title: 'Vue2的双向数据绑定原理',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tags: ['vue'],
            id: 1,
            date: '2023-03-01',
            author: 'Me'
        }, {
            title: 'Vue2的双向数据绑定原理',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tags: ['vue'],
            id: 1,
            date: '2023-03-01',
            author: 'Me'
        }, {
            title: 'Vue2的双向数据绑定原理',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tags: ['vue'],
            id: 1,
            date: '2023-03-01',
            author: 'Me'
        },]

        return {
            articles,
            page,
            changePage
        }
    }
})
</script>

<style scoped lang="less">
.articles {
    flex: 1;


    .article_info {
        width: 183px;
        margin-left: auto;
        .articles_date,
        .articles_author {
            margin-bottom: 5px;
        }
    }

    .pro_item {
        min-height: 160px;
        border-bottom: 1px solid #fff;
        padding: 20px 10px 0;
        box-sizing: border-box;

        .tags {
            margin-bottom: 5px;
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
        margin-bottom: 20px;

        h3 {
            font-size: 18px;
            width: max-content;
            margin-bottom: 10px;
            color: var(--lightblue);
            border-bottom: 1px solid transparent;
            padding-bottom: 2px;
            transition: .3s;
        }

        p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.87);
        }

        &:hover h3 {
            border-bottom-color: var(--lightblue);
        }
    }
}
</style>