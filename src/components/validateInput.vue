<template>
    <div class="inputBox">
        <input type="text" :class="{ 'validate-input-error': inputRef.error }" autocomplete="off" v-bind="$attrs"
            :value="inputRef.value" @input="onInput" @blur="validate">
        <span>{{ label }}</span>
        <p v-show="inputRef.error">{{ inputRef.message }}</p>
        <i></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType, onMounted } from 'vue';
import mitt from 'mitt'
interface ruleProp {
    type: 'require' | 'email' | 'range';
    message: string;
    minLen?: number;
    maxLen?: number;
}
export type rulesProp = ruleProp[]
export type ValidateFn = () => boolean;
export type Events = {
    'form-item-created': ValidateFn
}
export const emitter = mitt<Events>()
export default defineComponent({
    props: {
        modelValue: String,
        rules: Array as PropType<rulesProp>,
        label: String
    },
    inheritAttrs: false,
    setup(props, context) {
        const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        const inputRef = reactive({
            value: props.modelValue || '',
            error: false,
            message: ''
        })
        const onInput = (e: Event) => {
            inputRef.value = (e.target as HTMLInputElement).value;
            context.emit('update:modelValue', inputRef.value);
        }
        const validate = () => {
            if (props.rules) {
                const isPass = props.rules.every(rule => {
                    let flag = true;
                    inputRef.message = rule.message;
                    switch (rule.type) {
                        case 'require':
                            flag = (inputRef.value.trim() !== '');
                            break;
                        case 'email':
                            flag = emailReg.test(inputRef.value);
                            break;
                        case 'range':
                            if (rule.minLen) {
                                flag = !(inputRef.value.trim().length < rule.minLen);
                                inputRef.message = rule.message;
                                if (!flag) break;
                            }
                            if (rule.maxLen) {
                                flag = !(inputRef.value.trim().length > rule.maxLen);
                                inputRef.message = rule.message;
                                break;
                            }
                        default:
                            break;
                    }
                    return flag
                })
                inputRef.error = !isPass
                return isPass
            }
            return true
        }
        onMounted(() => {
            emitter.emit('form-item-created', validate)
        })
        return {
            inputRef,
            onInput,
            validate
        }
    }
})
</script>

<style scoped>
.inputBox {
    position: relative;
    width: 100%;
    margin-top: 35px;
    box-sizing: border-box;
}

.inputBox input {
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    color: #000;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    z-index: 10;
    box-sizing: border-box;
}
.inputBox p {
    position: absolute;
    left: 0;
    font-size: 12px;
    bottom: -20px;
    color: rgb(226, 119, 119);
}
.inputBox span {
    position: absolute;
    left: 0;
    padding: 20px 0px 10px;
    pointer-events: none;
    font-size: 1em;
    color: #8f8f8f;
    letter-spacing: 0.05em;
    transition: 0.5s;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
    color: #6c4fbd;
    transform: translateX(0px) translateY(-34px);
    font-size: 0.75em;
}

.inputBox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(150deg, #a189e2 , #e0b5eb);
    border-radius: 4px;
    overflow: hidden;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
}

.inputBox input:valid~i,
.inputBox input:focus~i {
    height: 44px;
}
</style>