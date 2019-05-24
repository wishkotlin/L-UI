<template>
    <div class="layout" :class="layoutClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "l-layout",
        data(){
            return {
                layoutClass: {
                    hasSider: false
                }
            }
        },
        mounted() {
            // console.log(this.$children);
            this.$children.forEach((vm) => {
                // console.log(vm.$options.name);
                if(vm.$options.name === 'g-sider'){
                    this.layoutClass.hasSider = true
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
    .layout {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        /*border: 1px red solid;*/
        &.hasSider{
            flex-direction: row;
        }

    }
</style>
