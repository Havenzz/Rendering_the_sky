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

<style scoped>
.form-container
{
	position: absolute;
	inset: 2px;
	background: #28292d;
	padding: 50px 40px;
	border-radius: 8px;
	z-index: 2;
	display: flex;
	flex-direction: column;
}
.title 
{
	color: #c7b7f5;
	font-weight: 600;
	text-align: center;
	letter-spacing: 0.1em;
    font-size: 26px;
}
.submit__btn {
    display: block;
    width: 100%;
    height: 50px;
    max-width: 500px;
    margin: 22px auto 0;
    position: relative;
    outline: none;
	background: linear-gradient(150deg, #a189e2 , #e0b5eb);
	cursor: pointer;
	border-radius: 4px;
	font-weight: 600;
    outline: none;
    overflow: hidden;
    border: none;
    color: #000;
}

.submit__btn span {
    transition: .6s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    opacity: 0;
    font-weight: bold;
}
.submit__btn span.active{
    opacity: 1;
}
.submit__loading{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow:inset -4px -4px 0 0 yellow;
    animation: rotate 1s linear infinite;
}
@keyframes rotate{
    0%{transform: translate(-50%,-50%) rotate(0);}
    100%{transform: translate(-50%,-50%) rotate(360deg);}
}
</style>