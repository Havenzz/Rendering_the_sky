<template>
    <div class="upload">
        <button @click.prevent="triggerUpload">
            <span v-if="fileStatus === 'loading'">Upload...</span>
            <span v-else-if="fileStatus === 'success'">Upload Success!</span>
            <span v-else>Click Upload</span>
        </button>
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
type uploadStatus = 'ready' | 'loading' | 'success' | 'error';

const props = defineProps<props>()
const emit = defineEmits<{
    (e: 'fileUpload', res: any): void;
    (e: 'fileUploadError', error: any): void;
}>()

const fileInput = ref<HTMLInputElement | null>(null);
const fileStatus = ref<uploadStatus>('ready')

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
        fileStatus.value = 'loading';
        const formData = new FormData();
        formData.append('file', files[0]);
        axios.post(props.action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(resp => {
            emit('fileUpload', resp)
            fileStatus.value = 'success'
        }).catch(e => {
            emit('fileUploadError', e)
            fileStatus.value = 'error'
        }).finally(() => {
            if (fileInput.value) {
                fileInput.value.value = ''
            }
        })
    }
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