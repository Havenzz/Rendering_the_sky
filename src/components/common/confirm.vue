<template>
    <teleport to='#confirm'>
        <div class="confirm" v-if="isShow">
            <mdialog title="CONFIRM" width="auto" @handle-close="cancel">
                <div class="content">
                    <span>{{ message }}</span>
                </div>
                <div class="btn_container">
                    <button @click="confirm">确认</button>
                    <button @click="cancel">取消</button>
                </div>
            </mdialog>
        </div>
    </teleport>
</template>

<script lang="ts" setup>
import mdialog from './mdialog.vue';
import { defineProps, ref } from 'vue';
import useCreateAndRemoveDOM from '../../hook/useCreateAndRemoveDOM';
const props = defineProps<{
    message: string;
    callback: Function;
}>()

useCreateAndRemoveDOM('confirm')
const isShow = ref<boolean>(true)
const confirm = () => {
    props.callback()
    isShow.value = false;
}
const cancel = () => {
    isShow.value = false;
}

</script>

<style lang="less" scoped>
.confirm {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
}

.content {
    min-height: 50px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    min-width: 200px;
}

.btn_container {
    border-top: 1px solid #000;
    display: flex;
    justify-content: center;
    button {
        margin: 10px 6px;
        padding: 2px 8px;
        border-radius: 4px;
        outline: none;
    }
}</style>