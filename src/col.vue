<template>
    <div class="col" :class="[`col-${span}`]">
        <slot>

        </slot>
    </div>
</template>

<script>
    export default {
        name: "g-col",
        props: {
            span: {
                type: [Number,String] ,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col {
        height: 100px;
        background: aqua;
        width: 50%;
        outline: 1px red solid;

        $class-prefix: col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: calc(100% * #{$n} / 24);
            }
            .col[data-col='2'] {
                width: calc(100% * 2 / 24);
            }
        }
    }
</style>
