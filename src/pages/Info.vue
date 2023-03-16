<template>
    <div class="info_container">
        <div class="info">
            <div class="header_bg">
                <div class="avatar">
                    <img src="../assets/logic.jpg">
                </div>
                <div class="user_info">
                    <div class="user_header">
                        <h2>Haven Wu</h2>
                        <span>- Web前端 -</span>
                    </div>
                    <div class="user_content">
                        <p style="text-decoration: line-through;">我贼能加班。</p>
                        <p style="text-decoration: line-through;">喜欢唱跳rap篮球。</p>
                        <p>目前居住在广东深圳处于离职状态，希望能够找到一家心仪的公司。</p>
                        <p style="margin-top: 20px">
                            <i class="iconfont">&#xe870;</i> Email : humorouslogic@outlook.com
                        </p>
                        <p>
                            <i class="iconfont">&#xe883;</i> WeChat : -becauseican
                        </p>
                    </div>
                    <span class="address">
                        <i class="iconfont">&#xe8ae;</i> 福建 泉州
                    </span>
                    <a class="github" href="https://github.com/Logic533">
                        <i class="iconfont">&#xe885;</i> My Github <i class="iconfont">&#xe7eb;</i>
                    </a>
                </div>
            </div>
            <div class="content">
                <div class="content_box">
                    <container title="个人简介">
                        <p>本人热衷于 web 中有趣的交互和精妙的逻辑，不论是设计或是实现都让我觉得十分有意思。</p>
                        <p>另外对 webGL 以及 Blender 颇有兴趣，因为这可以将模型渲染在页面上并进行交互，我正在努力学习中。</p>
                        <p>偶尔也会在 CSDN 或博客上面发表一些文章或者自己平时记录的笔记。</p>
                    </container>
                    <container title="README.md">
                        <p>最早萌生出搭建这个网站的想法是因为我看到 BBC 出品的电视剧《神探夏洛克》。剧中夏洛克福尔摩斯的搭档约翰华生时常在自己的博客（ The blog of Dr. John H. Watson ）上发表一些案情和琐碎的事情，我觉得这很时髦。现实生活中真的有人搭建了这个博客，尽管现在已经没有人维护了，但也给了我灵感。</p>
                        <p>关于首页的模型，来自于设计师 WON 在 Sketchfab 发表的作品 ...Fire in the sky ，我在 Sketchfab 的每周精选中看到了这个模型，我特别喜欢并决定展示它。</p>
                        <p>作者 Sketchfab ：<a class="link" href="https://sketchfab.com/won1" target="_blank">https://sketchfab.com/won1</a></p>
                        <p>前端框架使用了 Vue ，后端框架使用了 NestJS 。</p>
                        <p>我在博客里集成了 TinyMCE 富文本编辑器和 Prism 代码高亮工具，这使得在这里可以轻松的编辑自己想要的文本、代码块、图片并进行上传。</p>
                        <p>还没有打算开放注册，不过我会将已经创建好的账号分享给我认为可以发表内容的人。</p>
                        <p>(๑•̀ㅂ•́)و✧</p>
                    </container>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import container from '../components/common/container.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components:{
        container
    },
    setup(){
        return {
        }
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
            position: relative;
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
                    width: 193px;
                    height: 193px;
                }
            }

            @media screen and (max-width:500px) {
                .avatar{
                    margin: 0 auto;
                    width: 150px;
                    height: 150px;
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
                    width: 100%;
                    margin-top: 20px;
                    font-size: 14px;
                    padding-left: 10px;
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
.github {
    position: absolute;
    bottom: 15px;
    right: 25px;
    background-color: #20252e;
    padding: 2px 11px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #D3D3D3;
    border: none;
    transition: .3s;
    border-radius: 6px;

    &:hover {
        box-shadow: 0 0 8px 2px rgba(0, 0, 0, .1);
        color: #fff;
        background-color: #353E4E;
    }


    i + i{
        font-size: 12px;
        vertical-align: 1px;
    }

}
.link{
    color: #fff;
    &:hover{
        text-decoration: underline;
    }
}
</style>