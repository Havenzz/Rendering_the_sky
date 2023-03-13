<template>
    <mdialog title="选择标签" @handle-close="close">
        <ul class="chooseBox">
            <template v-for="tag of tags" :key="tag">
                <transition appear>
                    <li v-if="!isChecked(tag)">
                        <label>
                            {{ tag }}
                            <input type="checkbox" 
                            @change="handleChange(tag)" 
                            :value="tag" 
                            :checked="isChecked(tag)"
                            v-show="false"
                            >
                        </label>
                    </li>
                </transition>
            </template>
        </ul>
        <div class="tags_container">
            <template v-if="modelValue.length > 0">
                <span 
                class="tag"
                v-for="(tag,index) of modelValue" 
                :key="index" 
                >
                    {{ tag }}
                    <i @click="removeTag(tag)" class="iconfont">&#xeb6a;</i>
                </span>
            </template>
            <p v-else>请选择标签 (●'◡'●)</p>
        </div>
    </mdialog>
</template>

<script lang="ts" setup>
import mdialog from '../common/mdialog.vue';
import { defineProps, defineEmits } from 'vue';
import createMessage, { MESSAGE_DELAY } from '../common/createMessage';
const props = defineProps<{
    modelValue: string[],
    tags: string[]
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
    (e: 'close'): void;
}>()

const isChecked = (value: string) => {
    return props.modelValue.indexOf(value) !== -1;
}

const handleChange = (value: string) => {
    const newValue = [...props.modelValue];
    if(newValue.length < 3){
        const index = newValue.indexOf(value);
        if (index === -1) {
            newValue.push(value);
        } else {
            newValue.splice(index, 1);
        }
        emit('update:modelValue', newValue);
    }else{
        createMessage('最多只能选择三个标签','error',MESSAGE_DELAY)
    }
}

const removeTag = (value: string) => {
    const newValue = [...props.modelValue];
    const index = newValue.indexOf(value);
    newValue.splice(index, 1)
    emit('update:modelValue', newValue);
}

const close = () => {
    emit('close')
}

</script>

<style lang="less" scoped>
.chooseBox{
    overflow: hidden;
    li{
        height: 50px;
        box-sizing: border-box;
        text-align: center;
        line-height: 50px;
        color: var(--white);
        transition: .3s;
        label{
            display: block;
            width: 100%;
            height: 100%;
            cursor: pointer;
            &:hover{
                background-color: rgba(0, 0, 0, .6);
                color: #fff;
                text-shadow: 0 0 8px;
                transition: .6s;
            }
        }
    }
}
.v-enter-to{
    transform: translateX(0%);
}
.v-leave-to,.v-enter-from{
    transform: translateX(-110%);
}
.tags_container{
    display: flex;
    height: 30px;
    padding: 10px 0 15px;
    border-top: 1px solid #000;
    justify-content: center;
    p{
        color: var(--white);
        font-size: 14px;
        line-height: 30px;
    }
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
    display: block;
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
</style>