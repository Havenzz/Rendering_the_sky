<template>
    <container title="新建文章">
        <div class="articleInfo">
            <router-link to="/articles">~ go back</router-link>
            <div class="article_title">
                <label>文章标题:</label>
                <input type="text" placeholder="请输入文章标题" v-model="article.title">
            </div>
            <div class="article_describe">
                <label>文章描述:</label>
                <textarea autocomplete="off" placeholder="请输入文章描述，最多可以输入128个字符" maxlength="128" v-model="article.describe"></textarea>
            </div>
            <div class="article_content">
                <label>文章内容:</label>
                <input type="text" v-model="article.content">
            </div>
            <div class="article_image">
                <label>文章封面：</label>
                <postImage @getImgBlob="getImgBlob"></postImage>
            </div>
            <div class="article_tags">
                <label>文章标签:</label>
                <div class="tags_container">
                    <span v-for="tag of article.tags" class="tag" :key="tag">{{ tag }}</span>
                    <span class="addTag">add tag</span>
                </div>
            </div>
        </div>
    </container>
</template>

<script lang="ts" setup>
import container from '../../components/container.vue';
import postImage from '../../components/postImage.vue';
import { reactive } from 'vue';
interface article {
    title: string;
    describe: string;
    content: string;
    imageSrc: string;
    uploader: string;
    tags: string[];
}

const article = reactive<article>({
    title: '',
    describe: '',
    content: '',
    imageSrc: '',
    uploader: '',
    tags: []
})

const getImgBlob = (img: Blob) => {
    img
}
</script>

<style lang="less" scoped>
.articleInfo {
    padding: 10px 0 20px;
    label{
        display: block;
        margin: 10px 0;
    }
    textarea{
        resize: none;
    }
    textarea,
    .article_title input,
    .article_describe input{
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, .3);
        width: 100%;
        padding: 8px 16px;  
        border: 1px solid #454062; 
        border-radius: 8px;
        color: #fff;
        outline: none;
    }
    .article_content{

    }
}
</style>