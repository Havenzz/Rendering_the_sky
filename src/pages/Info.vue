<template>
    <div class="info_container">
        <div class="info">
            <div class="header_bg">
                <div class="avatar">
                    <img src="../assets/logic.jpg">
                </div>
                <div class="user_info">
                    <div class="user_header">
                        <h2>Logic</h2>
                        <span>- Web前端工程师 -</span>
                    </div>
                    <div class="user_content">
                        <p>我很憧憬类似漫画家这样的人，因为他们同时具备能够想象出有趣的东西的能力，和可以将自己所想象的画面呈现出来的能力。</p>
                        <p>因此我对设计与制作感兴趣，我想要找到一种可以兼顾两者的生活方式。</p>
                        <p>后来通过自己选择的专业接触到前端的知识，发现了在Web中也能设计出华丽的效果，以及有趣的互动，并可以使用简洁高效的代码实现，我便对此产生了浓厚的兴趣。</p>
                    </div>
                    <span class="address">广东深圳</span>
                </div>
            </div>
            <div class="content">
                <div class="content_box">
                    <container title="技术栈">
                        <p>主要使用过 Photoshop、Axure、XD、Sketch 进行设计。</p>
                        <p style="line-height:20px;">主要使用过
                            HTML、CSS、JavaScript、TypeSciprt、Vue2、Vue3、uni-app、Aioxs、Webpack、Bootstrap、Vite、ElementUI、Vant、Ant
                            Design、jQuery、Bootstrap、Swiper、Zepto、Echarts、Thress.js、Weex、uView、Less 进行开发。</p>
                        <p>另外还对 WebGL 和 Blender 感兴趣，将其当作一种可以让3D模型在浏览器中工作的方法。这方面我只是个业余爱好者，但我正在努力学习。</p>
                    </container>
                    <container title="个人技能">
                        <p>1.熟悉 W3C 标准，理解语义化，遵循主流编码规范，有前端性能优化意识；</p>
                        <p>2.熟悉多种网页布局方式，熟悉 HTML5/CSS3 新特性；</p>
                        <p>3.熟练使用 Vue 全家桶及 Vue3 + ts 开发；</p>
                        <p>4.熟悉常用前端 Javascript 可视化工具 Echarts；</p>
                        <p>5.熟练使用 TypeScript，JavaScript，ES6 新标准语法；</p>
                        <p>6.熟练使用 ElementUI、Vant、Ant Design 等常用 UI 组件库；</p>
                        <p>7.熟练使用 jQuery、Bootstrap、swiper、Zepto 等 js 库；</p>
                        <p>8.熟练掌握浏览器各种调试工具，熟悉小程序、uni-app 的项目开发；</p>
                        <p>9.熟悉面向对象编程，熟悉面向对象设计，对原型链、继承、闭包有一定的认识；</p>
                        <p>10. 熟悉 Gitee、GitHub 进行项目代码管理以及版本控制，并遵循一定的流行规范；</p>
                        <p>11. 了解 Node.js 后台语言；</p>
                        <p>12. 了解自动化构建工具，如 webpack、vite。</p>
                    </container>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import container from '../components/container.vue';
export default defineComponent({
    components: {
        container
    },
    setup() {

    }
})
</script>

<style scoped lang="less">
.info_container {
    max-width: 980px;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 100px;
    height: 100%;

    .info {
        width: 100%;
        height: 100%;

        .header_bg {
            min-height: 300px;
            margin: 0 auto;
            background: radial-gradient(farthest-side at bottom right, rgba(109, 38, 44, 0.301), transparent 500px), radial-gradient(farthest-corner at bottom left, rgba(50, 255, 193, 0.103), transparent 600px);
            background-color: rgba(43, 45, 68, 0.93);
            background-repeat: no-repeat;
            background-position: center;
            box-sizing: border-box;
            padding: 25px;
            display: flex;

            .avatar {
                border: 2px solid #a189e2;
                width: 233px;
                height: 233px;
                margin-right: 48px;
                flex-shrink: 0;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            @media screen and (max-width:700px) {
                flex-direction: column;
                .avatar{
                    margin: 0 auto;
                    width: 183px;
                    height: 183px;
                }
            }

            .user_info {
                .user_header {
                    display: flex;
                    align-items: flex-end;

                    h2 {
                        margin: 6px 24px 0 0;
                        font-size: 36px;
                    }
                }

                span {
                    font-size: 12px;
                    opacity: .66;
                }

                .user_content {
                    display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                    margin-top: 20px;
                    font-size: 14px;
                    padding: 0 30px 0 10px;
                    margin-bottom: 24px;

                    p {
                        padding-bottom: 5px;
                    }
                }
                .address {
                    padding-left: 5px;
                }

                @media screen and (max-width:700px) {
                    .user_header {
                        flex-direction: column;
                        align-items: center;
                        h2{
                            margin: 10px 0;
                        }
                    }
                    .user_content {
                        padding: 0;
                    }
                }
            }

            .user_right {
                flex: 1;

                &>p {
                    text-align: end;
                }

                &>button {
                    background-color: #2B3444;
                    height: 30px;
                    line-height: 0;
                    font-size: 13px;
                    color: #D3D3D3;
                    border: none;
                    transition: .3s;
                    border-radius: 3px;

                    &:hover {
                        box-shadow: 0 0 8px 2px rgba(0, 0, 0, .1);
                        color: #fff;
                        background-color: #353E4E;
                    }
                }
            }

            .user_state {
                width: 100%;
                border-radius: 3px;
                background-color: rgba(0, 0, 0, 0.3);
                height: 66px;
                margin: 30px auto 16px;

                p {
                    line-height: 66px;
                    text-align: center;
                }
            }
        }

        .content {
            background: radial-gradient(farthest-side at top right, rgba(109, 38, 44, 0.301), transparent 500px), radial-gradient(farthest-corner at top left, rgba(50, 255, 193, 0.103), transparent 600px), radial-gradient(farthest-corner at bottom right, rgba(109, 38, 44, 0), transparent 500px), radial-gradient(farthest-corner at bottom left, rgba(50, 255, 193, 0.103), transparent 600px);
            background-color: rgba(43, 45, 68, 0.93);
            overflow: hidden;
            padding-top: 16px;
            padding: 16px 12px;
            margin: 0 auto 20px;
            font-size: 13px;
            height: 100%;
            margin-top: 20px;
            display: flex;
            align-items: flex-start;

            .content_box {
                width: 100%;
                height: 100%;

                p {
                    padding: 6px;
                }
            }
        }
    }
}
</style>