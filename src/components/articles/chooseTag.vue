<template>
    <mdialog title="选择标签">
        <ul>
            <li v-for="tag of tags" :key="tag">{{ tag }}<input type="checkbox" @change="inputChange" name="tag" :value="tag"></li>
        </ul>
    </mdialog>
</template>

<script lang="ts" setup>
import mdialog from '../common/mdialog.vue';
import { defineProps, defineEmits } from 'vue';
defineProps<{
    modelValue: string[],
    tags: string[]
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>()

const inputChange = (e:Event) => {
    console.log((e.target as HTMLInputElement).value)
    emit('update:modelValue',(e.target as HTMLInputElement).value)
}

</script>