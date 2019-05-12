<template>
    <div class="col" :class="[ span && `col-${span}`,offset && `col-offset-${offset}`]"
    :style="{padding: `0 ${gutter}px`}">
        <div class="gutter-box">
        <slot>

        </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "g-col",
        data(){
            return{
                gutter: this.$props.gutter
            }
        },
        props: {
            span: {
                type: [Number, String],
            },
            offset: {
                type: [Number, String],
            },
            // gutter: {
            //     type: [Number,String],
            // }
        },
        computed: {
            // gutter: function(){
            //     return this.$props.gutter
            // }
            // gutter: {
            //     get: function () {
            //         return this.$props.gutter
            //     },
            //     set: function (newValue) {
            //         this.$props.gutter = newValue
            //     }
            // }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    .col {
        height: 100px;
        /*background: aqua;*/
        width: 50%;
        /*outline: 1px red solid;*/
        /*border: 1px solid red;*/
        //间隙
        /*padding: 0 10px;*/
        $class-prefix: col-;
        @for $n from 1 through 24 {
            &.#{$class-prefix}#{$n} {
                width: calc(100% * #{$n} / 24);
            }
        }
        $class-prefix-offset: col-offset-;
        @for $n from 1 through 24 {
            &.#{$class-prefix-offset}#{$n} {
                margin-left: calc(100% * #{$n} / 24);
            }
        }
        .gutter-box{
            outline: 1px solid red;
            background: rgb(76, 188, 240);
            height: 100px;
        }
    }
</style>
