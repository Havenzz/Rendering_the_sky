<template>
    <div id="tinymcetextarea" ref="textArea"></div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue';
import tinymce from 'tinymce/tinymce';
import 'tinymce/plugins/autoresize'
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default';
import 'tinymce/models/dom';

interface EditorProps {
    modelValue?: string;
    // options?: QuillOptionsStatic;
}
interface EditorEvents {
    (type: 'update:modelValue', value: string): void;
    (type: 'change', value: string): void;
    (type: 'blur'): void;
}
const toolbarOptions = [
    'bold', 'italic', 'underline',
    { header: 1 }, { header: 2 },
    'blockquote', 'code-block', 'code', 'link',
    { list: 'ordered' }, { list: 'bullet' },
    'image',
]
const emit = defineEmits<EditorEvents>();
const props = defineProps<EditorProps>();

const textArea = ref<HTMLTextAreaElement | null>(null);
// let quillInstrance: Quill | null = null;
const innerValue = ref(props.modelValue || '');

onMounted(() => {
    if (textArea.value) {
        tinymce.init({
            target: textArea.value,
            base_url:'/public/tinymce',
            skin_url: '/public/tinymce/skins/ui/oxide',
            height: 300,
            language_url:'/public/tinymce/langs/zh-Hans.js',
            language:'zh_CN',
            language_load:true,
            toolbar:true,
            plugins:'autoresize',
            menu: {
                file: { title: '文件', items: 'newdocument' },
                edit: { title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall' },
                insert: { title: '插入', items: 'link media | template hr' },
                view: { title: '查看', items: 'visualaid' },
                format: { title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
                table: { title: '表格', items: 'inserttable tableprops deletetable | cell row column' },
                tools: { title: '工具', items: 'spellchecker code' }
            }
        });
    }
})

onUnmounted(() => {

})

</script>

<style scoped lang="less">
.editor {
    color: #fff;

    .quill_editor {
        background-color: #fff;
        border: 1px solid var(--deeppurple);
        background-color: rgba(0, 0, 0, .3);
    }

    :deep(.ql-toolbar) {
        border: 1px solid var(--deeppurple);
        background-color: rgba(0, 0, 0, .3);
    }

    :deep(.ql-editor) {
        min-height: 300px;
    }
}
</style>
