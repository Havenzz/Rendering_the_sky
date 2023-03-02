<template>
    <div class="pager">
        <div class="pager_container">
            <button @click="prevPage" class="pager_btn prev">⬅ Previous</button>
            <div class="pagelist">
                <template v-for="(page, i) of computedPages" :key="i">
                    <span v-if="page" :class="{ active: currentPage === page }" @click="changePage(page)">{{ page }}</span>
                    <span v-else>...</span>
                </template>
            </div>
            <button @click="nextPage" class="pager_btn next">Next ➡</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
    props: {
        pageCount: {
            type: Number,
            default: 9
        },
        currentPage: {
            type: Number,
            default: 1
        }
    },
    emits: ['changePage'],
    setup(props, context) {
        const changePage = (page: number) => {
            context.emit('changePage', page);
        }
        const nextPage = () => {
            if (props.currentPage + 1 > props.pageCount) return;
            context.emit('changePage', props.currentPage + 1);
        }
        const prevPage = () => {
            if (props.currentPage - 1 < 1) return;
            context.emit('changePage', props.currentPage - 1);
        }
        const computedPages = computed(() => {
            const MAX_LEN = 9;
            const len = props.pageCount > MAX_LEN ? MAX_LEN : props.pageCount;
            if (props.currentPage > props.pageCount) {
                throw new Error('current cannot be greater than sum.')
            }
            const pages = new Array(len).fill(void (0))

            if (pages.length >= MAX_LEN) {
                return pages.map((item, i) => {
                    const pageNum = i + 1;
                    
                    if (i < 2) {
                        return pageNum
                    }
                    if (i === 2) {
                        if (props.currentPage > 5 && props.pageCount > MAX_LEN) {
                            return false
                        } else {
                            return pageNum
                        }
                    }
                    if (i > 2 && i < MAX_LEN - 3) {
                        if (props.currentPage > 5 && props.pageCount > MAX_LEN) {
                            if (props.pageCount - props.currentPage >= 4) {
                                return props.currentPage + pageNum - 5
                            } else {
                                return props.pageCount + pageNum - MAX_LEN
                            }
                        } else {
                            return pageNum
                        }
                    }
                    if (i === MAX_LEN - 3) {
                        if (props.pageCount - props.currentPage > 4 && props.pageCount > MAX_LEN) {
                            return false
                        } else {
                            return props.pageCount + pageNum - MAX_LEN 
                        }
                    }
                    if (i >= MAX_LEN - 2) {
                        return props.pageCount + pageNum - MAX_LEN
                    }
                });
            } else {
                return pages.map((item, i) => i + 1);
            }
        })

        return {
            changePage,
            computedPages,
            prevPage,
            nextPage
        }
    }
})
</script>

<style scoped lang="less">
.pager {
    width: 100%;

    .pager_container {
        width: max-content;
        display: flex;
        align-items: center;
        margin: 10px auto;
        justify-content: space-between;

        @media screen and (max-width: 750px) {
            width: 70%;
        }
    }

    .pagelist {
        display: flex;
        justify-content: space-between;
        margin: 0 10px;
        user-select: none;

        span {
            display: block;
            text-align: center;
            width: 37.5px;
            height: 37.5px;
            line-height: 37.5px;
            border: 1px solid transparent;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
            transition: border .3s;

            &.active,
            &:hover {
                border-color: #AA97EC;
            }
        }

        @media screen and (max-width: 750px) {
            span {
                display: none;
            }
        }
    }

    .pager_btn {
        background-color: transparent;
        color: #AA97EC;
        width: 102.5px;
        outline: none;
        user-select: none;
    }
}
</style>