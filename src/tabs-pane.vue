<template>
    <div class="tabs-pane" :class="classes" v-if="active">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "tabs-pen",
        inject: ['EventBus'],
        data() {
            return {
                active: false
            }

        },
        props: {
            name: {
                type: String,
            }
        },
        created: function () {
            this.EventBus.$on('update:selected', (name) => {
                if (name !== this.name) {
                    // console.log(`我是pane ${this.name},我${name}没被选中`)
                    this.active = false
                } else {
                    // console.log(`我是pane ${this.name},我${name}被选中了`)
                    this.active = true
                }
            })
        },
        computed: {
            classes() {
                return {
                    active: this.active
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tabs-pane {
        padding: 1em;

        &.active {
            /*background: red;*/
        }
    }
</style>
