<template>
    <div>
        <div class="upload" :style="{ backgroundImage: 'url(' + (currentImg) + ')' }" @click="chooseImage"></div>
        <mdialog width="auto" v-if="uploadDialog" @handleClose="handleClose">
            <template #header>
                <h2 class="title">选择图片</h2>
            </template>
            <div class="container">
                <div class="view">
                    <div class="image-preview">
                        <img :src="newImg" class="image" ref="imageRef" />
                    </div>
                </div>
                <div class="confirm">
                    <button @click="confirmImage">确认</button>
                </div>
            </div>
        </mdialog>
        <input v-show="false" ref="fileRef" type="file" accept="image/png, image/jpeg" @change="getImageInfo" />
    </div>
</template>

<script lang="ts" setup>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { ref, defineEmits, nextTick, defineProps } from 'vue';
import mdialog from './mdialog.vue';
import createMessage, { MESSAGE_DELAY } from './createMessage';

const emit = defineEmits<{
    (e: 'getImgBlob', blob: Blob): void
}>()
const props = defineProps<{
    imgURL?: string;
}>()

let cropper: Cropper;
const currentImg = ref<string>('');
const newImg = ref<string>('');
const fileRef = ref<null | HTMLInputElement>(null);
const MAX_SIZE = 512;

if (props.imgURL) {
    currentImg.value = props.imgURL;
} else {
    import('../assets/fengmian.png').then(r => {
        currentImg.value = r.default;
    })
}

const uploadDialog = ref(false);

const openUpload = () => {
    uploadDialog.value = true;
};

const handleClose = () => {
    uploadDialog.value = false;
    cropper.destroy();
};

const chooseImage = () => {
    if (fileRef.value) {
        fileRef.value.click();
    }
};
// 确认图片
const confirmImage = () => {
    let cas = cropper.getCroppedCanvas();
    let base64url = cas.toDataURL('image/jpeg');
    cas.toBlob(function (blob) {
        if (blob) {
            emit('getImgBlob', blob)
        }
    });
    // 使用bese64进行预览 不发送请求
    currentImg.value = base64url;
    uploadDialog.value = false
};

const imageRef = ref<HTMLImageElement | null>(null);

// 获取文件信息
const getImageInfo = (e: any) => {
    // 上传的文件
    let file = (e.target!).files[0];
    if (!file) {
        return false
    }
    let fileSize = (file.size / 1024).toFixed(2);
    if (+fileSize > MAX_SIZE) {
        createMessage(`图片大小必须在${MAX_SIZE}kb以内!`, 'error', MESSAGE_DELAY);
        return false;
    }
    // 获取 window 的 URL 工具
    let URL = window.URL || window.webkitURL;
    // 通过 file 生成目标 url
    newImg.value = URL.createObjectURL(file);
    // 弹框
    openUpload()
    nextTick(() => {
        // 判定裁剪对象是否存在
        // 存在销毁重新创建（这里不替换图片，图片不一样大时会变形），不存在创建对象
        if (cropper) {
            cropper.destroy();
            cropImage();
        } else {
            cropImage();
        }
    });
};

// 裁剪图片
const cropImage = () => {
    if (imageRef.value) {
        cropper = new Cropper(imageRef.value, {
            aspectRatio: 16 / 10,
            viewMode: 1,
            background: false,
        });
    }
};



</script>

<style lang="less" scoped>
.upload {
    width: 320px;
    height: 200px;
    box-sizing: border-box;
    cursor: pointer;
    background-position: center center;
    background-size: 100%;
    position: relative;

    &::before {
        content: '替换封面';
        text-align: center;
        position: absolute;
        line-height: 200px;
        background-color: rgba(0, 0, 0, .6);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        transition: .3s;
    }

    &:hover::before {
        opacity: 1;
    }
}

.container {
    flex-shrink: 1;
    margin: 20px 0;
    box-sizing: border-box;

    .view {
        padding: 0 20px;
    }

    .confirm {
        margin-top: 20px;
        padding: 20px 20px 0;
        border-top: 1px solid #1C1C1C;

        button {
            padding: 6px 0;
            width: 100%;
        }
    }
}



.image-preview {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;

    .image {
        width: 480px;
        height: 300px;
        display: block;
    }
}

.title {
    font-size: 18px;
    padding: 12px;
    color: var(--white);
    width: 100%;
}
</style>