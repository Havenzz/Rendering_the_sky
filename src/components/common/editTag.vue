<template>
    <teleport to='#back'>
        <mdialog>
            
        </mdialog>
    </teleport>
</template>

<script lang="ts" setup>
import useCreateAndRemoveDOM from '../../hook/useCreateAndRemoveDOM';
import mdialog from './mdialog.vue';
useCreateAndRemoveDOM('back')

</script>

<style lang="less" scoped>

</style>