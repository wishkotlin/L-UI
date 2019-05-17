<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="line" ref="line" v-show="lineShow"></div>
        <div class="actions-wrapper">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabs-head",
        inject: ['EventBus'],
        data() {
            return {
                lineShow: false
            }
        },
        mounted() {
            this.EventBus.$on('update:selected', (item, vm) => {
                // console.log(item,vm.$el);
                this.lineShow = true
                this.$nextTick( () => {
                    //新增一个函数 放到 任务队列里面
                } )
                const {width, height, top, left} = vm.$el.getBoundingClientRect()
                // console.log(width, height, top, left)
                this.$refs.line.style.width = `${width}px`
                // this.$refs.line.style.left = `${left}px`
                this.$refs.line.style.transform = `translate3d(${left}px, 0px, 0px)`
                // transform: translate3d(0px, 0px, 0px);
            })
            // this.EventBus.$on('update:selected', (name) => {
            // })
        }
    }
</script>

<style lang="scss" scoped>
    $tab-height: 40px;
    $color: #2188ff;
    .tabs-head {
        display: flex;
        height: $tab-height;
        justify-content: flex-start;
        align-items: center;
        /*border: 1px solid red;*/
        position: relative;
        border-bottom: 1px solid #ccc;
        /*margin-bottom: 16px;*/

        > .line {
            position: absolute;
            bottom: 0;
            border-bottom: 1px solid $color;
            /*transition: transform .3s cubic-bezier(.645, .045, .355, 1),width .3s cubic-bezier(.645, .045, .355, 1),left .3s cubic-bezier(.645, .045, .355, 1),-webkit-transform .3s cubic-bezier(.645, .045, .355, 1);*/
            transition: all 0.3s;
        }

        > .actions-wrapper {
            margin-left: auto;
            padding: 0 1em;
        }
    }
</style>
