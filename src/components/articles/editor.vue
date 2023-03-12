<template>
    <div id="tinymcetextarea" ref="textArea"></div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted } from 'vue';
import tinymce from 'tinymce/tinymce';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/code'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/advlist'
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default';
import 'tinymce/models/dom';
import '/public/tinymce/langs/zh-Hans.js'

interface EditorProps {
    modelValue?: string;
}
interface EditorEvents {
    (type: 'update:modelValue', value: string): void;
    (type: 'change', value: string): void;
    (type: 'blur'): void;
}
const emit = defineEmits<EditorEvents>();
const props = defineProps<EditorProps>();

const textArea = ref<HTMLTextAreaElement | null>(null);
const innerValue = ref(props.modelValue || '');

onMounted(() => {
    if (textArea.value) {
        tinymce.init({
            target: textArea.value,
            base_url: '/tinymce',
            skin: 'oxide',
            height: 400,
            language: 'zh-Hans',
            toolbar: 'undo redo | styles | bold italic | forecolor backcolor | link | bullist numlist',
            plugins: 'autoresize,codesample,searchreplace,table,code,link,lists,advlist',
            codesample_global_prismjs: true,
            min_height: 500,
            color_cols: 7,
            custom_colors: false,
            color_map: [
                "000000", "Black",
                "C21C13", "Red",
                "DB7800", "Orange",
                "0E52D4", "Blue",
                "0080A0", "Sky Blue",
                "A639D7", "Purple",
                "58A401", "Green",
                "DA326B", "Pink",
                "D1A300", "Yellow",
            ],
            menu: {
                file: { title: 'File', items: 'newdocument restoredraft | preview | export print | deleteallconversations' },
                edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
                insert: { title: 'Insert', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                help: { title: 'Help', items: 'help' }
            },
            setup: (editor) => {
                editor.on('init', () => {
                    editor.setContent(innerValue.value)
                })
            },
            init_instance_callback: (editor) => {
                editor.on('input', (e) => {
                    innerValue.value = e.target.innerHTML;
                    emit('update:modelValue', e.target.innerHTML)
                })
                editor.on('change', (e) => {
                    innerValue.value = e.level.content;
                    emit('update:modelValue', e.level.content)
                })
            }
        });
    }
})

onUnmounted(() => {
    tinymce.activeEditor?.destroy()
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
