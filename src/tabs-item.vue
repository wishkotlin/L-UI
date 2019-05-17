<template>
    <div class="tabs-item" @click="xxx" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "tabs-item",
        data() {
            return {
                active: false
            }
        },
        props: {//需要开发者传值 将数据放到props 里面
            disabled: {
                type: Boolean,
                default: false,
            },
            name: {
                type: [String, Number],
                required: true,
            }
        },
        inject: ['EventBus'],
        created() {
            this.EventBus.$on('update:selected', (name) => {
                if (name === this.name) {
                    console.log(`我是item ${this.name},我${name}被选中了`)
                    this.active = true
                } else {
                    console.log(`我是item ${this.name},我${name}没被选中`)
                    this.active = false
                }
            })
        },
        methods: {
            xxx() {
                this.EventBus.$emit('update:selected', this.name,this)
            }
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
    $color: #1890ff;
    .tabs-item {
        padding: 0 1em;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 100%;
        color: rgba(0,0,0,0.65);
        &.active {
            /*background: red;*/
            color: $color;
            font-weight: bold;
        }
    }
</style>
