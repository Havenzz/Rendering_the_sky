<template>
    <div class="inputBox">
        <input v-if="tagType === 'input'" type="text" :class="{ 'validate-input-error': inputRef.error }" autocomplete="off"
            v-bind="$attrs" :value="inputRef.value" @input="onInput" @blur="validate">
        <textarea v-else :class="{ 'validate-input-error': inputRef.error }" autocomplete="off" v-bind="$attrs"
            :value="inputRef.value" @input="onInput" @blur="validate"></textarea>
        <span>{{ label }}</span>
        <p v-show="inputRef.error">{{ inputRef.message }}</p>
        <i></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, watch } from 'vue';
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
        label: String,
        tagType: {
            type: String,
            default: 'input'
        }
    },
    inheritAttrs: false,
    setup(props, context) {
        const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        const inputRef = reactive({
            value: props.modelValue || '',
            error: false,
            message: ''
        })
        watch(() => props.modelValue, newValue => {
            if(newValue){
                inputRef.value = newValue
            }
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
    display: flex;
    flex: 0;
    flex-wrap: wrap;
}

.inputBox span {
    order: 0;
}

.inputBox input,
.inputBox textarea {
    order: 1;
}

.inputBox p {
    order: 2;
}

.inputBox textarea {
    outline: none;
    resize: none;
}
</style>