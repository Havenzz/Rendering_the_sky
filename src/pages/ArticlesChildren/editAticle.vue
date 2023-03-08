<template>
    <container title="新建文章">
        <formContainer class="articleInfo">
            <router-link to="/articles">~ go back</router-link>
            <validateInput label="文章标题：" placeholder="请输入文章标签" :rules="[{ message: 'hh', type: 'require' }]"
                v-model="article.title">
            </validateInput>
            <validateInput label="文章描述：" tagType="textarea" placeholder="请输入文章描述，最多可以输入128个字符" maxlength="128"
                :rules="[{ message: 'hh', type: 'require' }]" v-model="article.describe">
            </validateInput>
            <div class="article_content">
                <label>文章内容:</label>
                <editor v-model="article.content" :options="editorOptions"></editor>
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
            <template #submit>
                <button>submit</button>
            </template>
        </formContainer>
    </container>
</template>

<script lang="ts" setup>
import container from '../../components/container.vue';
import postImage from '../../components/postImage.vue';
import formContainer from '../../components/formContainer.vue';
import validateInput from '../../components/validateInput.vue';
import editor from '../../components/editor.vue';
import { Options } from 'easymde';
import { reactive } from 'vue';
import { highlight } from 'prismjs';
interface article {
    title: string;
    describe: string;
    content: string;
    imageSrc: string;
    uploader: string;
    tags: string[];
}
const editorOptions: Options = {
    spellChecker: false,
    renderingConfig: {
        codeSyntaxHighlighting: true,
    }
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

    :deep(.inputBox) {
        position: relative;
        padding-bottom: 20px;

        input,
        textarea {
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, .3);
            width: 100%;
            padding: 8px 16px;
            border: 1px solid #454062;
            border-radius: 8px;
            color: #fff;
            outline: none;
        }

        span {
            display: block;
            margin: 10px 0;
            font-size: 16px;
            text-indent: 5px;
        }

        p {
            line-height: 28px;
            color: var(--red);
            height: 28px;
            position: absolute;
            top: 80%;
            left: 10px;
        }
    }

}
</style>