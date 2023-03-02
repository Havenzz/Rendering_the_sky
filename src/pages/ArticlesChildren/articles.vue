<template>
    <container class="articles" title="Articles">
        <div class="pro_item" v-for="(article, index) of articles" :key="index">
            <router-link class="article" :to="`/articles/${''+article.id}`">
                <h3>{{ article.title }}</h3>
                <p>{{ article.content }}</p>
            </router-link>
            <div class="tags">
                <span v-for="(tag, index) of article.tag" :key="index">{{ tag }}</span>
            </div>
            <div class="articles_date">{{ article.date }}</div>
        </div>
        <pager :pageCount="20" :currentPage="page" @change-page="changePage" />
    </container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import pager from '../../components/pager.vue';
import container from '../../components/container.vue';
interface article {
    title: string;
    content: string;
    tag: string[];
    url: string;
    id: number;
    date: string;
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
            title: 'Vue2的双向数据绑定原理',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tag: ['vue'],
            url: '#',
            id: 1,
            date: '2023-03-01'
        }, {
            title: 'Vue2的双向数据绑定原理',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tag: ['vue'],
            url: '#',
            id: 1,
            date: '2023-03-01'
        }, {
            title: 'Vue2的双向数据绑定原理',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tag: ['vue'],
            url: '#',
            id: 1,
            date: '2023-03-01'
        }, {
            title: 'Vue2的双向数据绑定原理',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tag: ['vue'],
            url: '#',
            id: 1,
            date: '2023-03-01'
        }, {
            title: 'Vue2的双向数据绑定原理',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tag: ['vue'],
            url: '#',
            id: 1,
            date: '2023-03-01'
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

    .articles_date {
        text-align: end;
        margin-bottom: 5px;
    }

    .pro_item {
        min-height: 160px;
        border-bottom: 1px solid #fff;
        padding: 20px 10px 0;
        box-sizing: border-box;

        .tags {
            margin-bottom: 5px;
            display: flex;

            span {
                display: block;
                border-radius: 8px;
                padding: 6px 12px;
                background-color: rgba(255, 255, 255, .9);
                border: 1px solid transparent;
                color: #000;
                font-weight: bold;
                transition: .3s;
                cursor: pointer;

                &:hover {
                    border-color: #AA97EC;
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
            color: #b4bdff;
            border-bottom: 1px solid transparent;
            padding-bottom: 2px;
            transition: .3s;
        }

        p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.87);
        }

        &:hover h3 {
            border-bottom-color: #B4BDFF;
        }
    }
}
</style>