<template>
    <div class="collapse">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "collapse"
    }
</script>

<style lang="scss" scoped>
    $gray: #ddd;
    .collapse {
        border: 1px solid $gray;
        border-radius: 4px;
        border-bottom: 0;
        background-color: #fafafa;

        .collapse-item:last-child {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }
</style>
