<template>
    <div class="wrapper">
        <input type="text">
    </div>

</template>

<script>
    export default {
        /**
         * name 是用来调试的 在 vue devtools 中使用
         */
        name: "G-Input",
    }
</script>

<style lang="scss" scoped>
$height: 32px;
$border-color: #999;
    .wrapper{
        > input{
            height: $height;
            border: 1px solid $border-color;
        }

    }
</style>
