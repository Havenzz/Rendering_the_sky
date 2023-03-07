<template>
    <div>
        <div :class="[
            'upload',
            `upload-${shape}`
        ]" :style="{ backgroundImage: 'url(' + (imgUrl) + ')' }" @click="openUpload"></div>
        <!-- 上传弹窗 -->
        <div title="更换头像" width="560px" append-to-body :close-on-click-modal="false" @close="handleClose">
            <input type="text" v-model="uploadDialog">
            <div class="container">
                <!-- 左侧裁剪区 -->
                <div class="left">
                    <!-- 大图显示区 -->
                    <!-- :style="{ 'background-image': 'url(' + imgUrl + ')' }" -->
                    <div class="big-image-preview">
                        <img :src="imgUrl" alt="大图" class="big-image" ref="imageRef" />
                    </div>
                    <div class="tool">
                        <i class="el-icon-refresh-left" @click="rotateImage(-45)"></i>
                        <i class="el-icon-circle-plus-outline" @click="zoomImage(0.2)"></i>
                        <i class="el-icon-remove-outline" @click="zoomImage(-0.2)"></i>
                        <i class="el-icon-refresh-right" @click="rotateImage(45)"></i>
                    </div>
                </div>
                <!-- 右侧预览区 -->
                <div class="right">
                    <!-- 小图预览区域 -->
                    <div class="right-top">
                        <div>预览</div>
                        <div class="image-view"
                            :style="{ width: '100px', height: '100px', 'border-radius': shape == 'default' ? '10px' : '50%' }">
                        </div>
                        <div>100 x 100</div>
                        <div class="image-view"
                            :style="{ width: '50px', height: '50px', 'border-radius': shape == 'default' ? '10px' : '50%' }">
                        </div>
                        <div>50 x 50</div>
                    </div>
                    <!-- 按钮 -->
                    <div class="right-bottom">
                        <div>
                            <button @click="chooseImage">上传</button>
                            <button @click="uploadImage">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 只用input来实现上传，但是不显示input -->
            <input v-show="false" ref="fileRef" type="file" accept="image/png, image/jpeg" @change="getImageInfo" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, Ref } from 'vue';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
export default defineComponent({

    props: {
        // 形状
        shape: {
            type: String,
            default: 'round',
            validator: (val: string) => {
                return ['default', 'round'].includes(val);
            }
        },
        // 上传地址
        uploadUrl: {
            type: String,
            default: ''
        }
    },
    setup() {
        // 默认显示的图片
        let imgUrl = ref('../assets/logic.jpg');
        // 裁剪对象
        let cropper: any;

        /**
         * 处理弹窗相关
         */
        let handleDialog = () => {
            // 打开上传弹窗
            let uploadDialog = ref(false);
            // 打开弹窗方法
            let openUpload = () => {
                uploadDialog.value = true;
            };
            // 关闭弹窗
            let handleClose = () => {
                uploadDialog.value = false;
                cropper.destroy();
            };

            // input文件ref
            let fileRef = ref<Ref | null>(null);
            // 选择图片
            let chooseImage = () => {
                // 当input的type属性值为file时，点击方法可以进行选取文件
                if (fileRef.value) {
                    fileRef.value.click();
                }
            };
            // 上传头像
            let uploadImage = () => {
                let cas = cropper.getCroppedCanvas();
                let base64url = cas.toDataURL('image/jpeg');
                cas.toBlob(function (e: Event) {
                });
                console.log('图片：', base64url); // 生成base64图片的格式
            };

            return {
                uploadDialog,
                openUpload,
                handleClose,
                fileRef,
                chooseImage,
                uploadImage
            };
        };

        // 处理图片上传
        let handleImageUpload = () => {
            // 裁剪的图片
            let imageRef = ref<any>(null);

            // 获取文件信息
            let getImageInfo = (e: any) => {
                // 上传的文件
                if (e.target) {
                    let file = e.target.files[0];
                    let fileSize:string = (file.size / 1024).toFixed(2);
                    if (+fileSize > 1024) {
                        // ElMessage.warning('图片大小必须在1MB以内！');
                        return false;
                    }
                    // 获取 window 的 URL 工具
                    let URL = window.URL || window.webkitURL;
                    // 通过 file 生成目标 url
                    imgUrl.value = URL.createObjectURL(file);
                    // console.log('图片：', imgUrl);
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
                }

            };

            // 裁剪图片
            let cropImage = () => {
                if (imageRef.value) {
                    cropper = new Cropper(imageRef.value, {
                        // 宽高比
                        aspectRatio: 1,
                        viewMode: 1,
                        // 预览
                        preview: '.image-view',
                        // cropBoxResizable: false,
                        background: false,
                        crop(event:any) {
                            // console.log('裁剪');
                        }
                    });
                }
            };

            // 旋转
            let rotateImage = (angle:any) => {
                cropper.rotate(angle);
            };

            // 缩放
            let zoomImage = (num:number) => {
                cropper.zoom(num);
            };

            return {
                imageRef,
                getImageInfo,
                cropImage,
                rotateImage,
                zoomImage
            };
        };

        return {
            imgUrl,
            ...handleDialog(),
            ...handleImageUpload()
        };
    }

});
</script>

<style scoped lang="less">
.upload {
    width: 150px;
    height: 150px;
    border: 5px solid #eeeeee;
    box-sizing: border-box;
    cursor: pointer;
    background-position: center center;
    background-size: 100%;
}

//hover的基本样式
.base-hover() {
    position: absolute;
    width: 100%;
    height: 100%;
    content: "更换头像";
    background: black;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.6;
}

//默认形状
.upload-default {
    border-radius: 5px;
    position: relative;

    &:hover {
        &::before {
            .base-hover();
            border-radius: 5px;
        }
    }
}

//圆形
.upload-round {
    border-radius: 50%;
    position: relative;

    &:hover {
        &::before {
            .base-hover();
            border-radius: 50%;
        }
    }
}

.container {
    width: 520px;
    height: 400px;
    display: flex;
    .left {
        width: 65%;
        height: 100%;

        .big-image-preview {
            width: 100%;
            height: 85%;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
        }

        .tool {
            width: 100%;
            height: 15%;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                margin: 0px 10px;
                cursor:pointer;
            }
        }
        .big-image {
            width: 100%;
            height: 100%;
            display: block;
            max-width: 100%;
        }
    }
    .right {
        width: 35%;
        height: 100%;
        font-size: 14px;

        .right-top {
            width: 100%;
            height: 70%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .image-view {
                border: 1px solid gray;
                overflow: hidden;
            }
        }
        .right-bottom{
            width: 100%;
            height: 30%;
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
        }
    }
}
</style>
