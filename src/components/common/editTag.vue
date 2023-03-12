<template>
    <mdialog title="编辑标签" @handle-close="closeEditComp">
        <loading v-if="isLoading" :style="{ height: 541 + 'px' }"></loading>
        <template v-else>
            <ul class="taglist">
                <li v-for="tag of tags" :key="tag.id">
                    <span v-if="!tag.edit">{{ tag.name }}</span>
                    <input v-else class="tagEditInput" type="text" v-model="tag.name">
                    <div class="ope">
                        <span v-if="!tag.edit" @click="openEdit($event, tag)">edit</span>
                        <span v-else @click="updateTag(tag)">confirm</span>
                        /
                        <span v-if="!tag.edit" @click="removeTag(tag)">remove</span>
                        <span v-else @click="closeEdit(tag)">cancel</span>
                    </div>
                </li>
            </ul>
            <div class="addTag">
                <button v-if="!addInputShow" @click="openAdd">ADD TAG</button>
                <div class="addInputContainer" v-else>
                    <input id="addInput" v-model="addTagName" placeholder="请输入标签名" type="text">
                    <button @click="confirmAddTag">确认</button>
                    <button @click="closeAdd">取消</button>
                </div>
            </div>
        </template>
    </mdialog>
</template>

<script lang="ts" setup>
import mdialog from './mdialog.vue';
import loading from './loading.vue';
import { onMounted, computed, ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import { GlobalDataProps, Tag } from '../../store';
import createMessage, { MESSAGE_DELAY } from './createMessage';

interface EditTag extends Tag {
    edit?: boolean;
    oldName?: string;
}

const store = useStore<GlobalDataProps>()
const tags = ref<EditTag[]>()
const isLoading = computed(() => store.state.isLoading)
const addInputShow = ref<boolean>(false)
const addTagName = ref<string>('')

onMounted(() => {
    store.dispatch('getTags', tags)
})

const openEdit = (e: Event, tag: EditTag) => {
    tag.edit = true
    tag.oldName = tag.name
    const inputParent = ((e.target as HTMLElement).parentNode?.parentNode)
    nextTick(() => {
        (inputParent?.querySelector('.tagEditInput') as HTMLInputElement)?.focus()
    })
};

const closeEdit = (tag: EditTag) => {
    if (tag.oldName) {
        tag.name = tag.oldName;
    };
    delete tag.edit;
    delete tag.oldName;
}

const removeTag = (removeTag: EditTag) => {
    store.dispatch('removeTag',{ removeTag, tags })
}

const updateTag = (updateTag: EditTag) => {
    store.dispatch('updateTag',{ updateTag, tags })
}

const openAdd = () => {
    addInputShow.value = true;
    nextTick(() => {
        document.getElementById('addInput')?.focus()
    })
}
const closeAdd = () => addInputShow.value = false;
const confirmAddTag = () => {
    if (addTagName.value.trim() === '') {
        return createMessage('标签名不能为空', 'error', MESSAGE_DELAY)
    }
    const newTag = { name: addTagName.value }
    store.dispatch('addTag', { newTag, tags });
    addTagName.value = ''
    closeAdd()
}

const closeEditComp = () => {
    store.commit('UPDATE_TAGSEDIT',false)
}
</script>

<style lang="less" scoped>
.taglist {
    padding: 8px 20px;
    box-sizing: border-box;
    color: #fff;
    height: 500px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 4px;
        background: #4e48451f;
        opacity: 0.1;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, .75);
        border-radius: 5px;
    }

    li {
        border-bottom: 1px solid;
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        align-items: center;
        height: 50px;

        .ope span {
            color: var(--white);
            cursor: pointer;
            user-select: none;

            &:hover {
                color: #fff;
                text-shadow: 0 0 8px;
            }
        }
    }
}

.addTag {
    margin-bottom: 10px;
    border-top: 1px solid #000;

    button {
        display: block;
        padding: 4px 20px;
        margin: 10px auto 0;
    }
}

#addInput,
.tagEditInput {
    font-size: 16px;
    border: none;
    outline: none;
    padding: 0 4px;
    height: 40px;
    width: 50%;
}

.addInputContainer {
    padding: 0 20px;
    font-size: 14px;
    color: #fff;
    text-align: center;

    #addInput {
        background-color: transparent;
        margin: 10px auto;
        border-bottom: 1px solid #fff;
        height: 29px;
        color: #fff;
        width: 50%;
        text-align: center;
        display: block;
    }

    button {
        padding: 4px 12px;
        margin: 0 8px 0 0;
        display: inline-block;
    }
}
</style>