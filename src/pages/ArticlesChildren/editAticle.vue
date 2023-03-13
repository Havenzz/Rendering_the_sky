<template>
    <container :title="route.params.id ? article.title : '新建文章'">
        <formContainer class="articleInfo" @form-submit="submit">
            <router-link to="/articles">~ go back</router-link>
            <validateInput
             label="文章标题：" 
             placeholder="请输入文章标签" 
             :rules="[
                { message: '文章名称过长', type:'range', maxLen:32},
                { message: '文章标签不能为空', type: 'require' }
                ]"
                v-model="article.title">
            </validateInput>
            <validateInput label="文章描述：" tagType="textarea"
             placeholder="请输入文章描述，最多可以输入128个字符" maxlength="128"
                :rules="[{ message: '文章描述不能为空', type: 'require' }]"
                 v-model="article.describe">
            </validateInput>
            <div class="article_content">
                <label>文章内容:</label>
                <loading v-if="CTXisLoading" :style="{height: 400 + 'px'}"></loading>
                <Suspense v-else>
                    <editor v-model="article.content"></editor>
                    <template #fallback>
                        <loading :style="{height: 400 + 'px'}"></loading>
                    </template>
                </Suspense>
            </div>
            <div class="article_tags">
                <label>文章标签: ( 最多选择3个标签，至少选择1个 )</label>
                <div class="tags_container">
                    <span v-for="tag of article.tags" class="tag" :key="tag">{{ tag }}<i @click="removeTag(tag)" class="iconfont">&#xeb6a;</i></span>
                    <span v-if="article.tags.length < 3" class="addTag" @click="openTag">+ 添加标签</span>
                    <chooseTag v-if="chooseTagShow" v-model="article.tags" :tags="tagsName" @close="closeTag"></chooseTag>
                </div>
            </div>
            <div class="article_image">
                <label>文章封面：</label>
                <postImage :imgURL="article.imageSrc ? `${baseURL}/${article.imageSrc}` : ''" @getImgFile="getImgFile"></postImage>
            </div>
            <template #submit="scope">
                <div class="submit_btn">
                    <button @click.prevent="scope.onSubmit">{{ route.params.id ? '修改' : '提交' }}</button>
                </div>
            </template>
        </formContainer>
    </container>
</template>

<script lang="ts" setup>
import container from '../../components/common/container.vue';
import postImage from '../../components/common/postImage.vue';
import formContainer from '../../components/common/formContainer.vue';
import validateInput from '../../components/common/validateInput.vue';
import store from '../../store'
import { defineAsyncComponent, reactive, computed, ref, onMounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import createMessage, { MESSAGE_DELAY } from '../../components/common/createMessage';
import loading from '../../components/common/loading.vue';
import chooseTag from '../../components/articles/chooseTag.vue';
import createConfirm from '../../components/common/createConfirm';
import axios from 'axios';

const router = useRouter()
const route = useRoute()
const baseURL = axios.defaults.baseURL;
const editor = defineAsyncComponent({
    loader:() => import(/* webpackChunkName: "[request]" */'../../components/articles/editor.vue')
})
const tagsName = computed(() => store.state.tags.map(tag => tag.name));
const chooseTagShow = ref<boolean>(false);
const openTag = () => chooseTagShow.value = true;
const closeTag = () => chooseTagShow.value = false;

interface article {
    title: string;
    describe: string;
    content: string;
    uploader: string;
    tags: string[];
    imageSrc?:string;
    id?:string;
}

const article = reactive<article>({
    title: '',
    describe: '',
    content: '',
    uploader: store.state.user.username,
    tags: [],
})
watch(() => route.params.id,newValue => {
    if(!newValue){
        init()
    }
})

const init = () => {
    CTXisLoading.value = true;
    article.title = '';
    article.describe = '';
    article.content = '';
    article.uploader = store.state.user.username;
    article.tags = [];
    delete article.imageSrc;
    delete article.id;
    nextTick(() => {
        CTXisLoading.value = false;
    })
}

let file:File | null = null;
const CTXisLoading = ref<boolean>(false)

const removeTag = (removeItem:string) => {
    article.tags = article.tags.filter(tag => tag !== removeItem)
}

const getImgFile = (img: File) => {
    file = img
}

const submit = (validated: boolean) => {
    if(!validated){
        createMessage('文章标题或文章描述有误','error',MESSAGE_DELAY)
    }else if (article.content.trim() === ''){
        createMessage('文章内容不能为空','error',MESSAGE_DELAY)
    }else if(article.tags.length < 1){
        createMessage('至少选择1个文章标签','error',MESSAGE_DELAY)
    }else{
        if(!route.params.id){
            createConfirm(`确认提交 ${article.title} ？`,() => {
                store.dispatch('postArticle',{
                    file,
                    article:JSON.stringify(article)
                }).then(res => {
                    router.push('/articles');
                    createMessage(`文章 ${res.data.data.title} 上传成功`,'success',MESSAGE_DELAY)
                    store.dispatch('getArticles')
                })
            })
        }else{
            createConfirm(`确认修改 ${article.title} ？`,() => {
                store.dispatch('updateArticle',{
                    file,
                    article:JSON.stringify(article)
                }).then(res => {
                    router.push('/articles');
                    createMessage(`文章 ${res.data.data.title} 修改成功`,'success',MESSAGE_DELAY)
                    store.dispatch('getArticles')
                })
            })
        }
    }
}
// 如果是编辑文章状态
onMounted(() => {
    if(route.params.id){
        CTXisLoading.value = true
        store.dispatch('getArticle',route.params.id).then(res => {
            article.title = res.data.data.title;
            article.content = res.data.data.content;
            article.uploader = res.data.data.uploader;
            article.tags = res.data.data.tags.map((tag:any) => tag.name);
            article.describe = res.data.data.describe;
            if(res.data.data.imageSrc !== '#'){
                article.imageSrc = res.data.data.imageSrc;
            }
            article.id = res.data.data.id;
        }).catch(e => {
            router.push('/articles')
        }).finally(() => CTXisLoading.value = false)
    }
})
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
            background-color: #fff;
            width: 100%;
            padding: 8px 16px;
            border: 1px solid var(--purple);
            border-radius: 8px;
            color: #000;
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
    .addTag:hover{
        text-decoration: underline;
        text-shadow: 0 0 8px;
        cursor: pointer;
    }
    .submit_btn {
        text-align: center;
        padding-top: 20px;
        margin-top: 20px;
        border-top: 1px solid var(--deeppurple);
        padding-bottom: 0;

        button {
            padding: 8px 30px;
            outline: none;
        }
    }
}</style>