<template>
    <container :title="`unknown`">
        <pre><code class="language-javascript line-numbers">$(()=>{
        $(".a").click((e)=>{
            $.each()//
            $.extend();
        })
})</code></pre>

    </container>
</template>

<script lang="ts">
import '../../lib/prism/prism.css'
import { defineComponent, onMounted } from 'vue';
import container from '../../components/container.vue';
export default defineComponent({
    components: {
        container
    },
    setup() {
        onMounted(() => {
            import('../../lib/prism/prism.js');
        })
    }
})
</script>

<style scoped lang="less"></style>