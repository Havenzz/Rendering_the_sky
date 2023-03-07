<template>
    <container>
        <upload :action="``" @fileUpload="fileUpload"></upload>
    </container>
</template>

<script lang="ts" setup>
import container from '../../components/container.vue';
import upload from '../../components/upload.vue';
import createMessage, { MESSAGE_DELAY } from '../../components/createMessage';

const fileUpload = (res: any) => {
    createMessage(`上传成功(●'◡'●)`, 'success', MESSAGE_DELAY)
}
</script>