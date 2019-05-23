<template>
    <div class="collapse">
        <slot :single="single"></slot>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: "collapse",
        props: {
            single: {
                type: Boolean,
                default: false,
                required: true
            },
            defaultActiveKey: {
                type: String
            },
            activeKey: {
                type: [String, Array, Number]
            }
        },
        methods: {
            // status(vm) {
            //     console.log(vm)
            //     if (vm !== this) {
            //         console.log(vm,this)
            //         this.show = false
            //     }
            // }
        },
        data() {
            return {
                //事件中心
                eventBus: new Vue(),
                // show: false
            }
        },
        created() {

        },
        mounted() {
            this.$children.forEach((item) => {
                item.single = this.single
            })

            this.$emit('defaultActiveKey', this.defaultActiveKey)
            this.$on('update:activeKey', (name) => {
                console.log(this.$parent);
                this.$parent.activeKey = name
                console.log(name)
            })
        },
        provide() {
            if (this.single) {
                return {
                    eventBus: this.eventBus
                }
            }
        },
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
