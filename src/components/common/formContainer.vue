<template>
    <form class="form-container" @submit.prevent>
        <h2 class="title">{{ title }}</h2>
        <slot></slot>
        <div @click.prevent="onSubmit">
            <slot name="submit">
                <button class="submit__btn">
                    <span :class="{ active: !isLoading }">Login</span>
                    <span :class="{ active: isLoading }" class="submit__loading"></span>
                </button>
            </slot>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue';
import { ValidateFn, emitter } from './validateInput.vue';
export default defineComponent({
    emits: ['form-submit'],
    props:{
        title:String
    },
    setup(props, context) {
        const validateFnArr: ValidateFn[] = [];
        const isLoading = ref(false)
        const onSubmit = () => {
            const isPassed = validateFnArr.map(callback => callback()).every(result => result)
            context.emit('form-submit', isPassed, isLoading)
        }
        const onFormItemCreated = (callback: ValidateFn) => {
            validateFnArr.push(callback)
        }

        emitter.on('form-item-created', onFormItemCreated)

        onUnmounted(() => {
            emitter.off('form-item-created', onFormItemCreated)
        })
        return {
            onSubmit,
            isLoading
        }
    }
})
</script>