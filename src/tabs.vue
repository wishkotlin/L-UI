<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: "tabs",
        props: {
            selected: {
                type: String,
                required: true
            },
            direction: {
                type: String,
                default: 'Horizontal',
                validator(value) {
                    return ['Horizontal', 'Vertical'].indexOf(value) >= 0
                }
            }
        },
        created() {
            this.EventBus.$on('update:selected', (name) => {
            })
        },
        provide() {
            return {
                EventBus: this.EventBus
            }
        },
        data() {
            return {
                EventBus: new Vue()
            }
        },
        updated() {

        },
        mounted() {
            this.EventBus.$emit('update:selected',this.selected)
        }
    }
</script>

<style lang="scss" scoped>
    .tabs{
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
    }
</style>
