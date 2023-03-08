<template>
    <teleport to='#back'>
        <div id="login">
            <div class="closeLogin" @click="closeLogin"><i class="iconfont">&#xeb6a;</i></div>
            <form-container title="- Sign in -" @form-submit="formSubmit">
                <validate-input label="Username" v-model="userData.username" :rules="emailRule" required></validate-input>
                <validate-input label="Password" v-model="userData.password" :rules="passwordRule" type="password"
                    required></validate-input>
                <div class="links">
                    <a href="#">Forgot Password ?</a>
                    <a href="#">(●'◡'●)</a>
                </div>
            </form-container>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, Ref, reactive, onBeforeUnmount } from 'vue';
import background from '../components/background.vue';
import formContainer from '../components/formContainer.vue';
import validateInput, { rulesProp } from '../components/validateInput.vue';
import { useStore } from 'vuex';
import useCreateAndRemoveDOM from '../hook/useCreateAndRemoveDOM';

interface userDataProp {
    username: string;
    password: string;
}

export default defineComponent({
    components: { background, formContainer, validateInput },
    setup() {
        //init
        useCreateAndRemoveDOM('back');
        const store = useStore();
        const closeLogin = () => {
            store.commit('UPDATE_ISSHOWLOGIN', false);
        }
        document.body.style.overflow = 'hidden'
        //data
        const userData = reactive<userDataProp>({
            username: '',
            password: ''
        })
        const emailRule: rulesProp = [{
            type: 'require',
            message: '邮箱为必填项'
        }, {
            type: 'range',
            message: '请输入正确的用户名',
            maxLen: 14
        }]
        const passwordRule: rulesProp = [{
            type: 'require',
            message: '密码为必填项'
        }, {
            type: 'range',
            message: '密码长度为6 ~ 14位',
            minLen: 6,
            maxLen: 14
        }]

        const formSubmit = (isPassed: boolean, isLoading: Ref) => {
            if (isPassed) {
                isLoading.value = true;
                const user: userDataProp = {
                    username: userData.username,
                    password: userData.password
                }
                const params = {
                    isLoading,
                    closeLogin
                }
                store.dispatch('signIn', { user, params })
            } else {
                console.log('error!!!')
            }
        }

        onBeforeUnmount(() => {
            document.body.removeAttribute('style');
        })

        return {
            userData,
            emailRule,
            passwordRule,
            formSubmit,
            closeLogin
        }
    }
})
</script>

<style scoped lang="less">
#login {
    --width: 365px;
    position: absolute;
    width: var(--width);
    height: 420px;
    background: #1c1c1c;
    border-radius: 8px;
    overflow: hidden;
    color: #000;

    :deep(.form-container) {
        position: absolute;
        inset: 2px;
        background: #28292d;
        padding: 50px 40px;
        border-radius: 8px;
        z-index: 2;
        display: flex;
        flex-direction: column;
    }

    :deep(.inputBox) {
        position: relative;
        width: 100%;
        margin-top: 40px;
        box-sizing: border-box;
    }

    :deep(.inputBox input) {
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

    :deep(.inputBox p) {
        position: absolute;
        left: 0;
        font-size: 12px;
        bottom: -20px;
        color: var(--red);
    }

    :deep(.inputBox span) {
        position: absolute;
        left: 0;
        padding: 20px 0px 10px;
        pointer-events: none;
        font-size: 1em;
        color: #8f8f8f;
        letter-spacing: 0.05em;
        transition: 0.5s;
    }

    :deep(.inputBox input:valid~span),
    :deep(.inputBox input:focus~span) {
        color: #6c4fbd;
        transform: translateX(0px) translateY(-40px);
        font-size: 0.75em;
    }

    :deep(.inputBox i) {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        transition: 0.5s;
        pointer-events: none;
        z-index: 9;
    }

    :deep(.inputBox input:valid~i),
    :deep(.inputBox input:focus~i) {
        height: 44px;
    }

    :deep(.title) {
        color: #c7b7f5;
        font-weight: 600;
        text-align: center;
        letter-spacing: 0.1em;
        font-size: 26px;
    }

    :deep(.submit__btn) {
        display: block;
        width: 100%;
        height: 50px;
        max-width: 500px;
        margin: 22px auto 0;
        position: relative;
        outline: none;
        background: linear-gradient(150deg, #a189e2, #e0b5eb);
        cursor: pointer;
        border-radius: 4px;
        font-weight: 600;
        outline: none;
        overflow: hidden;
        border: none;
        color: #000;
    }

    :deep(.submit__btn span) {
        transition: .6s;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        font-weight: bold;
    }

    :deep(.submit__btn span.active) {
        opacity: 1;
    }

    :deep(.submit__loading) {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: inset -4px -4px 0 0 yellow;
        animation: rotate 1s linear infinite;
    }

    @keyframes rotate {
        0% {
            transform: translate(-50%, -50%) rotate(0);
        }

        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
}

#login::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: -50%;
    left: -50%;
    width: var(--width);
    height: 420px;
    transform-origin: bottom right;
    background: linear-gradient(0deg, transparent, #8b63fa, #f4f7d4);
    animation: animate 6s linear infinite;
}

#login::after {
    content: '';
    z-index: 1;
    position: absolute;
    top: -50%;
    left: -50%;
    width: var(--width);
    height: 420px;
    transform-origin: bottom right;
    background: linear-gradient(0deg, transparent, #e374ff, #fdfdf8);
    animation: animate 6s linear infinite;
    animation-delay: -3s;
}

@keyframes animate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.links {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.links a {
    margin: 10px 0;
    font-size: 0.75em;
    color: #8f8f8f;
    text-decoration: beige;
}

.links a:hover {
    color: #6c4fbd;
}

.links a:nth-child(2) {
    color: #dfa9f0;
}



.closeLogin {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    z-index: 9;
    cursor: pointer;
    border-radius: 50%;
    color: #dfa9f0;
    line-height: 30px;
}

.closeLogin i {
    font-size: 24px;
    text-align: right;
}
</style>