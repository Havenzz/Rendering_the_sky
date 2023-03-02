<template>
    <div class="wrap">
        <div class="aside">
            <h2 class="date">2023.03.01</h2>
            <container class="search" title="Search">
                <template #header>
                    <search></search>
                </template>
                <ul class="classification">
                    <template v-for="n in 8">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>Javascript</li>
                    </template>
                </ul>
            </container>
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import container from '../components/container.vue';
import search from '../components/search.vue'
export default defineComponent({
    components: {
        container,
        search
    },
    setup() {

        return {

        }
    }
})
</script>

<style scoped lang="less">
.wrap {
    max-width: 1000px;
    margin: 0 auto;
    padding-top: 100px;
    display: flex;
    align-items: start;

    @media screen and (max-width:1000px) {
        width: 100%;
        flex-direction: column;
    }

    .search {
        width: 230px;
        .classification {
            padding: 10px 20px;

            li {
                line-height: 25px;
                list-style: disc;
                cursor: pointer;

                &:hover {
                    color: #fff;
                }
            }
        }

        @media screen and (max-width:1000px) {
            width: 100%;
        }
    }
}

.aside {
    margin-right: 30px;
    @media screen and (max-width:1000px) {
        width: 100%;
        margin-right: 0;
    }
}

.date {
    text-align: center;
    max-width: 230px;
    padding: 0 0 20px;
    margin: 0 auto;
    color: #AA97EC;
    margin-bottom: 20px;
    font-size: 36px;
    text-shadow: 1px 1px 0px #d89aeb, 2px 2px 0px #e0bede;
    border-bottom: 2px solid;
}


:deep(.log-container) {
    .log-container-content {
        padding-top: 0;
        padding-bottom: 0;
    }

    &.search .log-container-content {
        @media screen and (max-width:1000px) {
            display: none;
        }
    }
}
</style>