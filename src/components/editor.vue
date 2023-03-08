<template>
    <div class="easymde_editor">
        <textarea ref="textArea"></textarea>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue';
import EasyMDE, { Options } from 'easymde';

interface EditorProps {
    modelValue?: string;
    options?: Options;
}

interface EditorEvents {
    (type: 'update:modelValue', value: string): void;
    (type: 'change', value: string): void;
    (type: 'blur'): void;
}
const emit = defineEmits<EditorEvents>();
const props = defineProps<EditorProps>();

const textArea = ref<HTMLTextAreaElement | null>(null);
let easyMDEInstrance: EasyMDE | null = null;
const innerValue = ref(props.modelValue || '');
onMounted(() => {
    if(textArea.value){
        const config: Options = {
            ...(props.options || {}),
            element: textArea.value,
            initialValue: innerValue.value
        }
        easyMDEInstrance = new EasyMDE(config);

        easyMDEInstrance.codemirror.on('change', () => {
            if(easyMDEInstrance){
                const updatedValue = easyMDEInstrance.value();
                innerValue.value = updatedValue
                emit('update:modelValue',updatedValue)
                emit('change',updatedValue)
            }
        })
        easyMDEInstrance.codemirror.on('blur', () => {
            if(easyMDEInstrance){
                emit('blur');
            }
        })
    }
})

onUnmounted(() => {
    easyMDEInstrance?.cleanup()
    easyMDEInstrance = null
})

</script>
