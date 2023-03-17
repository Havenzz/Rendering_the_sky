<template>
    <div class="haven">
        <div class="avatar">
            <img src="../../assets/logic.jpg" alt="">
        </div>
        <p>Haven</p>
        <p>🐱‍🏍 努力学习拼命玩</p>
        <ul class="bar">
            <li>文章<span>6</span></li>
            <li>动态<span>1</span></li>
            <li>评论<span>0</span></li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.haven{
    width: 280px;
    height: 400px;
    background-color: rgba(0, 0, 0, .3);
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 0 8px rgba(0, 0, 0, .3);
    transition: .3s;
    &:hover{
        box-shadow: 0 0 8px rgba(0, 0, 0, .6);
    }
    .avatar{
        width: 180px;
        margin: 20px auto;
        border: 2px solid var(--purple);
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
    p{
        text-align: center;
        font-size: 18px;
    }
    p + p{
        font-size: 14px;
        padding: 20px 0;
    }
    .bar{
        display: flex;
        width: 233px;
        margin: 10px auto 0;
        list-style: none;
        border-top: 1px solid;
        li{
            flex: 1;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            padding-top: 10px;
            span{
                display: block;
                margin-top: 5px;
            }
        }
    }
}
</style>