<template>
    <container title="新建文章">
        <formContainer class="articleInfo" @form-submit="submit">
            <router-link to="/articles">~ go back</router-link>
            <validateInput
             label="文章标题：
             " placeholder="请输入文章标签" 
             :rules="[{ message: '文章标签不能为空', type: 'require' }]"
                v-model="article.title">
            </validateInput>
            <validateInput label="文章描述：" tagType="textarea"
             placeholder="请输入文章描述，最多可以输入128个字符" maxlength="128"
                :rules="[{ message: '文章描述不能为空', type: 'require' }]"
                 v-model="article.describe">
            </validateInput>
            <div class="article_content">
                <label>文章内容:</label>
                <Suspense>
                    <editor v-model="article.content"></editor>
                    <template #fallback>
                        <div>Loading...</div>
                    </template>
                </Suspense>
            </div>
            <div class="article_tags">
                <label>文章标签:</label>
                <div class="tags_container">
                    <span v-for="tag of article.tags" class="tag" :key="tag">{{ tag }}<i @click="removeTag(tag)" class="iconfont">&#xeb6a;</i></span>
                    <span v-if="article.tags.length <= 3" class="addTag">+ 添加标签</span>
                </div>
            </div>
            <div class="article_image">
                <label>文章封面：</label>
                <postImage @getImgFile="getImgFile"></postImage>
            </div>
            <template #submit>
                <div class="submit_btn">
                    <button>提交</button>
                </div>
            </template>
        </formContainer>
    </container>
</template>

<script lang="ts" setup>
import container from '../../components/container.vue';
import postImage from '../../components/postImage.vue';
import formContainer from '../../components/formContainer.vue';
import validateInput from '../../components/validateInput.vue';
import store from '../../store'
import { defineAsyncComponent } from 'vue'
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import createMessage from '../../components/createMessage';
import { DEFAULT_DELAY } from '../../main';

const router = useRouter()
const editor = defineAsyncComponent({
    loader:() => import('../../components/editor.vue')
})

interface article {
    title: string;
    describe: string;
    content: string;
    uploader: string;
    tags: string[];
}

const article = reactive<article>({
    title: '',
    describe: '',
    content: '',
    uploader: store.state.user.username,
    tags: ['javascript'],
})

let file:File | null = null;

const removeTag = (removeItem:string) => {
    article.tags = article.tags.filter(tag => tag !== removeItem)
}

const getImgFile = (img: File) => {
    file = img
}

const submit = (validated: boolean) => {
    if(validated && article.content.trim() !== '' && article.tags.length > 0){
        store.dispatch('postArticle',{
            file,
            article:JSON.stringify(article)
        }).then(res => {
            router.push('/articles');
            createMessage('上传文章成功','success',DEFAULT_DELAY)
            console.log(res)
        })
    }
}
</script>

<style lang="less" scoped>
.articleInfo {
    padding: 10px 0 20px;

    &>div {
        padding-bottom: 20px;
    }

    :deep(.inputBox) {
        position: relative;

        input,
        textarea {
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, .3);
            width: 100%;
            padding: 8px 16px;
            border: 1px solid var(--deeppurple);
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

    label {
        display: block;
        margin: 10px 0;
        font-size: 16px;
        text-indent: 5px;
    }

    .tags_container {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        height: 30px;
        span{
            margin: 0 10px;
        }
        .tag {
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
            i{
                font-size: 12px;
                margin-left: 5px;
                cursor: pointer;
            }

        }
    }

    .submit_btn {
        text-align: center;
        padding-top: 20px;
        margin-top: 20px;
        border-top: 1px solid var(--deeppurple);

        button {
            padding: 8px 30px;
        }
    }
}</style>