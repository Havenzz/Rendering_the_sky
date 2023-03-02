<template>
    <container>
        <template #header>
            <router-link class="back" to="/articles"> ⬅ Go back</router-link>
        </template>
        <h1 class="title">{{ article.title }}</h1>
        <div class="info">
            <p>作者：{{ article.author }}</p>
            <p>时间：{{ article.date }}</p>
            <p class="tags">文章标签：
                <a href="javascript:;" v-for="tag of article.tags">{{ tag }}</a>
            </p>
            <div v-if="article.reproduced" class="reproduced"><span>本文转载至：</span><a target="_blank" :href="article.reproduced">{{ article.reproduced
            }}</a></div>
        </div>
        <div class="content" >
            在开发中为了安全或满足分布式场景，通常会舍弃原有的session认证手段，而采用jwt(json web
            token)；但是使用token难免遇到token有效期的问题，如果token长期有效，服务端不断发布新的token，导致有效的token越来越多，这必然是存在安全问题的。而token不想session一样，在用户操作时会进行刷新，为了用户体验，这个刷新就需要自己实现。
            <pre class="line-numbers"><code class="language-javascript">$(()=>{
    $(".a").click((e)=>{
        $.each()//
        $.extend();
    })
})</code></pre>

        </div>
    </container>
</template>

<script lang="ts">
import prism from 'prismjs';
import { defineComponent, onMounted, ref } from 'vue';
import container from '../../components/container.vue';
import { article } from './articles.vue'
export default defineComponent({
    components: {
        container
    },
    setup() {
        const article: article = {
            title: '[转载] 关于实现token无感刷新的解决方案',
            content: '具体来说，当Vue实例创建时，它会遍历所有的属性，并使用Object.defineProperty()方法将这些属性转换成getter/setter。这样，当数据发生变化时，Vue能够检测到变化并通知所有相关的组件...',
            tags: ['jwt', 'axios'],
            id: 1,
            date: '2021-11-27 15:48:20',
            reproduced: 'https://blog.csdn.net/m0_48468380/article/details/121577011',
            author: '老蛙@'
        }
        onMounted(() => {
            // import('../../lib/prism/prism.js');
            prism.highlightAll()
        })

        return {
            article,
        }
    }
})
</script>

<style scoped lang="less">
.back {
    color: #fff;
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

.content {}
</style>