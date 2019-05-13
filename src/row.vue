<template>
    <div class="row" :style="rowstyle">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-row",
        props: {
            gutter: {
                type: [Number, String],
            }
        },
        computed: {
            rowstyle() {
                let {gutter} = this
                return {margin: `0 -${gutter/2}px`}
            }
        },
        /**
         * created 创建组件
         */
        created() {

        },
        /**
         * mounted 将组件放到页面上
         */
        mounted() {
            this.$children.forEach((vm) => {
                vm.gutter = this.gutter
            })
        }
    }
</script>

<style lang="scss" scoped>

    .row {
        display: flex;
        flex-wrap: wrap;
        //margin: 0 -10px;
        /*::v-deep .col {*/
        /*    padding: 0 10px;*/
        /*}*/
    }
</style>
