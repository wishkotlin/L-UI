<template>
    <div class="col" :class="colclass"
         :style="colstyle">
        <div class="gutter-box">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
    let validator = (value) => {
        let keys = Object.keys(value)
        let valid = true
        keys.forEach(key => {
            if (!['span', 'offset'].includes(key)) {
                valid = false
            }
        })
        return valid
    }
    export default {
        name: "g-col",
        data() {
            return {
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
            // phone: {
            //     type: Object,
            //     validator,
            //
            // },
            ipad: {
                type: Object,
                validator
            },
            narrow: {
                type: Object,
                validator
            },
            pc: {
                type: Object,
                validator
            },
            wide: {
                type: Object,
                validator
            },
            // gutter: {
            //     type: [Number,String],
            // }
        },
        computed: {
            colstyle() {
                return {
                    padding: `0 ${this.gutter}px`
                }
            },
            colclass() {
                let {span, offset, ipad, narrow, pc, wide} = this
                // if(phone){
                //     phoneclass = [`col-phone-${phone.span}`]
                // }
                return [
                    span && `col-${span}`,
                    offset && `col-offset-${offset}`,
                    // phone && `col-phone-${phone.span}`,
                    ipad && `col-ipad-${ipad.span}`,
                    narrow && `col-narrow-${narrow.span}`,
                    pc && `col-pc-${pc.span}`,
                    wide && `col-wide-${wide.span}`,
                ]
            }
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
        //手机
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

        .gutter-box {
            outline: 1px solid red;
            background: rgb(76, 188, 240);
            height: 100px;
        }


        //ipad
        @media (min-width: 577px) {
            $class-prefix: col-ipad-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: calc(100% * #{$n} / 24);
                }
            }
            $class-prefix-offset: col-ipad-offset-;
            @for $n from 1 through 24 {
                &.#{$class-prefix-offset}#{$n} {
                    margin-left: calc(100% * #{$n} / 24);
                }
            }
        }
        //窄屏幕
        @media (min-width: 769px) {
            $class-prefix: col-narrow-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: calc(100% * #{$n} / 24);
                }
            }
            $class-prefix-offset: col-narrow-offset-;
            @for $n from 1 through 24 {
                &.#{$class-prefix-offset}#{$n} {
                    margin-left: calc(100% * #{$n} / 24);
                }
            }
        }
        //pc
        @media (min-width: 993px) {
            $class-prefix: col-pc-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: calc(100% * #{$n} / 24);
                }
            }
            $class-prefix-offset: col-pc-offset-;
            @for $n from 1 through 24 {
                &.#{$class-prefix-offset}#{$n} {
                    margin-left: calc(100% * #{$n} / 24);
                }
            }
        }
        //大屏幕
        @media (min-width: 1200px) {
            $class-prefix: col-wide-;
            @for $n from 1 through 24 {
                &.#{$class-prefix}#{$n} {
                    width: calc(100% * #{$n} / 24);
                }
            }
            $class-prefix-offset: col-wide-offset-;
            @for $n from 1 through 24 {
                &.#{$class-prefix-offset}#{$n} {
                    margin-left: calc(100% * #{$n} / 24);
                }
            }
        }
    }
</style>
