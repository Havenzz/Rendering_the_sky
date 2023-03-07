<template>
    <div>
        <div class="upload" :style="{ backgroundImage: 'url(' + (imgUrl) + ')' }" @click="openUpload"></div>
        <div class="imageContainer">
            <img ref="viewContainer" id="viewContainer" :src="imgUrl">
        </div>
    </div>
</template>

<script lang="ts" setup>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { ref, onMounted, defineProps } from 'vue';

const viewContainer = ref<HTMLImageElement | null>(null);
let cropper: Cropper;
const props = defineProps<{
    uploadUrl: string;
}>()
let imgUrl = ref<string>('');
import('../assets/logic.jpg').then(r => {
    imgUrl.value = r.default
})

const openUpload = () => {
    console.log('isOK')
}


onMounted(() => {

    cropper = new Cropper(viewContainer.value as HTMLImageElement, {
        aspectRatio: 16 / 9,
        crop(event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
        },
    });
})


</script>

<style lang="less" scoped>
.upload{
    width: 300px;
    height: 200px;
    cursor:pointer
}
.imageContainer {
    width: 300px;
    height: 200px;
}

#viewContainer {
    display: block;

    max-width: 100%;
}
</style>