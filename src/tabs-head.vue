<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="line" ref="line"></div>
        <div class="actions-wrapper">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabs-head",
        inject: ['EventBus'],
        created() {
            this.EventBus.$on('update:selected',(item,vm) => {
                console.log(item,vm);
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
        border: 1px solid red;
        position: relative;

        > .line {
            position: absolute;
            bottom: 0;
            border-bottom: 1px solid $color;
            width: 100px;
        }

        > .actions-wrapper {
            margin-left: auto;
        }
    }
</style>
