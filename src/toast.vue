<template>
    <div class="toast">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-toast"
    }
</script>

<style lang="scss" scoped>
    $font-size: 14px;
    $toast-height: 40px;
    $toast-bg: rgba(0,0,0,0.75);
    .toast {
        /*border: 1px solid red;*/
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: $font-size;
        line-height: $toast-height;
        height: $toast-height;
        display: flex;
        align-items: center;
        background: $toast-bg;
        box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.50);
        border-radius: 4px;
        color: #fff;
        //4的倍数 或者 8 的倍数
        padding: 16px;
    }
</style>
