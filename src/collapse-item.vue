<template>
    <div class="collapse-item">
        <div class="title" @click="toggleItem">{{title}}</div>
        <transition name="fade"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter"
                    v-on:before-leave="beforeLeave"
                    v-on:leave="leave"
                    v-on:after-leave="afterLeave"
        >
            <!--        <transition name="fade">-->
            <div class="collapse-content" v-if="open">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "collapse-item",
        props: {
            title: {
                type: String,
                required: true
            },
            single: {
                type: Boolean
            },
            name: {
                type: [String, Number]
            }
        },
        data() {
            return {
                open: false,
            }
        },
        // inject: ['eventBus'],
        mounted() {
            this.$nextTick(() => {
                // console.log(this.$options.propsData.single)
                if (this.$options.propsData.single) {
                    this.$parent.$on('update:child', (vm) => {
                        if (vm !== this) {
                            this.close()
                        }
                    })
                }
            })
            console.log(this.name);
            this.$parent.$on('update:selected', (selected) => {
                if(this.name === selected){
                    this.open = true
                }
                console.log(selected)
            })


            // console.log(this.$options.propsData.show)
            // console.log(this.$parent);
            // if (this.$parent !== this) {
            //     this.$parent.$options.propsData.single = false
            // } else {
            //     this.$parent.$options.propsData.single = true
            // }
            // console.log(this);
            // this.eventBus && this.eventBus.$on('update:selected', (vm) => {
            //     if (vm !== this) {
            //         this.close()
            //     }
            // })
        },
        computed: {},
        // watch:{
        //     show:(newval,oldval) => {
        //         console.log(newval,oldval)
        //         // return this.$options.propsData.show
        //     }
        // },
        methods: {
            toggleItem() {
                if (this.open) {
                    this.open = false
                } else {
                    this.open = true
                    this.$nextTick(() => {
                        if (this.$options.propsData.single) {
                            this.$parent.$emit('update:child', this)
                        }
                    })
                    // this.status(this)
                    // this.eventBus && this.eventBus.$emit('update:selected', this)
                }
            },
            close() {
                this.open = false
            },
            // beforeEnter: function (el) {
            //     // el.style.opacity = 0
            //     el.style.height = 0
            //     el.style.transform = 'translateY(0)';
            // },
            // enter: function (el, done) {
            //     // var delay = el.dataset.index * 150
            //     // setTimeout(function () {
            //     console.log(el.getBoundingClientRect(), el.clientHeight)
            //     Velocity(
            //         el,
            //         {height: `100%`, transform: 'translateY(100%)'},
            //         {duration: 300},
            //         {complete: done}
            //     )
            //     // }, 100)
            // },
            // leave: function (el, done) {
            //     // var delay = el.dataset.index * 150
            //     // setTimeout(function () {
            //     Velocity(
            //         el,
            //         {height: 0, transform: 'translateY(0)'},
            //         // { duration: 300 },
            //         {complete: done}
            //     )
            //     // }, 100)
            // }

            beforeEnter(el) {
                this.addClass(el, 'collapse-transition');
                if (!el.dataset) el.dataset = {};

                el.dataset.oldPaddingTop = el.style.paddingTop;
                el.dataset.oldPaddingBottom = el.style.paddingBottom;

                el.style.height = '0';
                el.style.paddingTop = 0;
                el.style.paddingBottom = 0;
            },

            enter(el) {
                el.dataset.oldOverflow = el.style.overflow;
                if (el.scrollHeight !== 0) {
                    el.style.height = el.scrollHeight + 'px';
                    el.style.paddingTop = el.dataset.oldPaddingTop;
                    el.style.paddingBottom = el.dataset.oldPaddingBottom;
                } else {
                    el.style.height = '';
                    el.style.paddingTop = el.dataset.oldPaddingTop;
                    el.style.paddingBottom = el.dataset.oldPaddingBottom;
                }

                el.style.overflow = 'hidden';
            },

            afterEnter(el) {
                // for safari: remove class then reset height is necessary
                this.removeClass(el, 'collapse-transition');
                el.style.height = '';
                el.style.overflow = el.dataset.oldOverflow;
            },

            beforeLeave(el) {
                if (!el.dataset) el.dataset = {};
                el.dataset.oldPaddingTop = el.style.paddingTop;
                el.dataset.oldPaddingBottom = el.style.paddingBottom;
                el.dataset.oldOverflow = el.style.overflow;

                el.style.height = el.scrollHeight + 'px';
                el.style.overflow = 'hidden';
            },

            leave(el) {
                if (el.scrollHeight !== 0) {
                    // for safari: add class after set height, or it will jump to zero height suddenly, weired
                    this.addClass(el, 'collapse-transition');
                    el.style.height = 0;
                    el.style.paddingTop = 0;
                    el.style.paddingBottom = 0;
                }
            },

            afterLeave(el) {
                this.removeClass(el, 'collapse-transition');
                el.style.height = '';
                el.style.overflow = el.dataset.oldOverflow;
                el.style.paddingTop = el.dataset.oldPaddingTop;
                el.style.paddingBottom = el.dataset.oldPaddingBottom;
            },

            addClass(el, cls) {
                if (!el) return;
                var curClass = el.className;
                var classes = (cls || '').split(' ');

                for (var i = 0, j = classes.length; i < j; i++) {
                    var clsName = classes[i];
                    if (!clsName) continue;

                    if (el.classList) {
                        el.classList.add(clsName);
                    } else if (!hasClass(el, clsName)) {
                        curClass += ' ' + clsName;
                    }
                }
                if (!el.classList) {
                    el.className = curClass;
                }
            },
            removeClass(el, cls) {
                if (!el || !cls) return;
                var classes = cls.split(' ');
                var curClass = ' ' + el.className + ' ';

                for (var i = 0, j = classes.length; i < j; i++) {
                    var clsName = classes[i];
                    if (!clsName) continue;

                    if (el.classList) {
                        el.classList.remove(clsName);
                    } else if (hasClass(el, clsName)) {
                        curClass = curClass.replace(' ' + clsName + ' ', ' ');
                    }
                }
                if (!el.classList) {
                    el.className = trim(curClass);
                }
            }


        }
    }
</script>

<style lang="scss" scoped>
    $gray: #ddd;
    .collapse-item {
        border-bottom: 1px solid #d9d9d9;
        min-height: 32px;
        display: flex;
        /*align-items: center;*/
        /*padding: 0 8px;*/
        flex-direction: column;
        justify-content: center;

        > .title {
            /*border: 1px solid $gray;*/
            border-bottom: 1px solid #d9d9d9;
            margin-top: -1px;
            margin-left: -1px;
            margin-right: -1px;
            margin-bottom: -2px;
            min-height: 32px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            cursor: pointer;
        }

        > .collapse-content {
            padding: 8px;
            background: #fff;
        }

        &:first-child {
            > .title {
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
            }
        }


        &:last-child {
            > .title {
                border-radius: 0 0 4px 4px;
            }
        }
    }

    /*.fade-enter-active {*/
    /*    !*transition: all .3s ease;*!*/
    /*    -webkit-transition: width 500ms, height 500ms, background-color 500ms, -webkit-transform 500ms;*/
    /*    transition: width 500ms, height 500ms, background-color 500ms, transform 500ms;*/
    /*}*/

    /*.fade-leave-active {*/
    /*    !*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*!*/
    /*    -webkit-transition: width 500ms, height 500ms, background-color 500ms, -webkit-transform 500ms;*/
    /*    transition: width 500ms, height 500ms, background-color 500ms, transform 500ms;*/
    /*}*/

    /*.fade-enter, .fade-leave-to*/
    /*    !* .slide-fade-leave-active for below version 2.1.8 *!*/
    /*{*/
    /*    height: 0;*/
    /*}*/

    /*.fade-enter-to .fade-leave {*/
    /*    height: 100%;*/
    /*}*/

    .collapse-transition {
        transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
    }


</style>
