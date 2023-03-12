<template>
    <div class="upload">
        <slot v-if="fileStatus === 'ready'" name="ready" :renderData="renderData" :upload="upload" :cancel="cancel">
            <button @click.prevent="upload">upload</button>
            <button @click.prevent="cancel">cancel</button>
        </slot>
        <slot v-else-if="fileStatus === 'loading'" name="loading">
            <button>Upload...</button>
        </slot>
        <slot v-else-if="fileStatus === 'success'" name="success" :uploadData="uploadData">
            <button @click.prevent="triggerUpload">re-upload?</button>
        </slot>
        <slot v-else name="default">
            <button @click.prevent="triggerUpload">Click Upload</button>
        </slot>
        <input type="file" ref="fileInput" @change="handleFileChange">
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import axios from 'axios';
interface props {
    action: string
    beforeUpload?: (file: File) => boolean;
}
type uploadStatus = 'ready' | 'loading' | 'success' | 'error' | 'wait';

const props = defineProps<props>()
const emit = defineEmits<{
    (e: 'getFile', res: any): void;
    (e: 'fileUpload', res: any): void;
    (e: 'fileUploadError', error: any): void;
}>()

const fileInput = ref<HTMLInputElement | null>(null);
const fileStatus = ref<uploadStatus>('wait');
// 数据
const fileData = ref<any>();
const renderData = ref<any>()
const uploadData = ref<any>();
const uploadError = ref<any>();

const triggerUpload = () => {
    if (fileInput.value) {
        fileInput.value.click()
    }
}

const handleFileChange = (e: Event) => {
    const currentTarget = e.target as HTMLInputElement;
    if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        if (props.beforeUpload) {
            const result = props.beforeUpload(files[0]);
            if (!result) {
                return
            }
        }
        // 本地预览
        const render = new FileReader()
        render.onload = (e:any) => {
            renderData.value = e.target.result;
        }
        render.readAsDataURL(files[0])

        fileData.value = files[0];
        emit('getFile', files[0]);
        fileStatus.value = 'ready';
    }
}

const upload = () => {
    fileStatus.value = 'loading';
    const formData = new FormData();
    formData.append('file', fileData.value);
    axios.post(props.action, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(resp => {
        uploadData.value = resp;
        emit('fileUpload', resp);
        fileStatus.value = 'success';
    }).catch(e => {
        uploadError.value = e
        emit('fileUploadError', e)
        fileStatus.value = 'error'
    }).finally(() => {
        if (fileInput.value) {
            fileInput.value.value = ''
        }
    })
}
const cancel = () => {
    fileData.value = '';
    fileStatus.value = 'wait'
}
</script>

<style scoped lang="less">
.upload {
    button {
        outline: none;
    }

    input[type='file'] {
        display: none;
    }
}
</style>