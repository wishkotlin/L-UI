<template>
    <div class="tabs-body">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "tabs-body",
        inject: ['EventBus'],
        created() {
            // this.EventBus.$on('update:selected', (name) => {
            // })
        }
    }
</script>

<style lang="scss" scoped>

    .tabs-body{
        display: flex;
        flex-direction: row;
    }
</style>
