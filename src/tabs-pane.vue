<template>
    <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
            v-on:after-enter="afterEnter"
            v-bind:css="false"
            mode="out-in"
    >
        <div class="tabs-pane" ref="pane" :class="classes" v-if="active">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    import Velocity from 'velocity-animate'

    window.Velocity = window.velocity = Velocity;
    export default {
        name: "l-tabs-pen",
        inject: ['EventBus'],
        methods: {
            //进场前位置
            beforeEnter: function (el) {
                el.style.marginLeft = '100%'
            },
            //进场位置
            enter: function (el, done) {
                Velocity(el, {marginLeft: 0,}, {duration: 350}, {complete: done})

            },
            //进场后位置
            afterEnter(el, done) {
                Velocity(el, {opacity: 0}, {complete: done})
            },
            leave: function (el, done) {
                Velocity(el, {
                    marginLeft: '100%',
                    opacity: 0
                }, {complete: done})
            },

        },
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
            // console.log(this.EventBus)
            if (this.EventBus) {
                this.EventBus.$on('update:selected', (name, vm) => {
                    if (name !== this.name) {
                        // console.log(`我是pane ${this.name},我${name}没被选中`)
                        this.active = false
                    } else {
                        // console.log(`我是pane ${this.name},我${name}被选中了`)
                        this.active = true
                        this.$nextTick(() => {
                            // const {width, height, top, left} = this.$refs.pane.getBoundingClientRect()
                            // console.log(width, height, top, left)
                            // this.$refs.pane.style.opacity = 1;
                        })
                    }
                })
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
    .tabs-pane {
        padding: 1em;
        flex-shrink: 0;
        flex-grow: 1;
        width: 100%;

        &.active {
            /*background: red;*/
        }
    }
</style>
