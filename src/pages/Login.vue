<template>
    <teleport to='#back'>
        <div class="login">
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
import { defineComponent, Ref, reactive } from 'vue';
import background from '../components/background.vue';
import formContainer from '../components/formContainer.vue';
import validateInput, { rulesProp } from '../components/validateInput.vue';
import { signIn } from '../http'
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
                signIn({
                    username: userData.username,
                    password: userData.password
                }, {
                    isLoading,
                    closeLogin
                })
            } else {
                console.log('error!!!')
            }
        }

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

<style scoped>
.login {
    --width: 365px;
    position: absolute;
    width: var(--width);
    height: 420px;
    background: #1c1c1c;
    border-radius: 8px;
    overflow: hidden;
    color: #000;
}

.login::before {
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

.login::after {
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