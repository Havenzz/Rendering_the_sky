<template>
    <div>
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
div {
    margin: 0 4px;
    background-color: #20252e;
    padding: 2px 11px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color: #D3D3D3;
    border: none;
    transition: .3s;
    border-radius: 6px;
    outline: none;

    &:hover {
        box-shadow: 0 0 8px 2px rgba(0, 0, 0, .1);
        color: #fff;
        background-color: #353E4E;
    }
}
</style>