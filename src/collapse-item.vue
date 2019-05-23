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
            // single: {
            //     type: Boolean
            // },
            name: {
                type: [String, Number]
            }
        },
        data() {
            return {
                open: false,
                single: this.$props.single
            }
        },
        // inject: ['eventBus'],
        mounted() {
            this.$nextTick(() => {
                // console.log(this.$options.propsData.single)
                //是否只能选中一个
                console.log('singleprop', this.singleprop);
                console.log(this.single)
                if (this.single) {
                    //将父组件作为 eventbus
                    this.$parent.$on('child', (vm) => {
                        // console.log(vm)
                        //如果不是点击的组件 就关闭
                        if (vm !== this) {
                            this.close()
                        }
                    })
                }
            })
            console.log(this.name);
            //默认那个展开
            this.$parent.$on('defaultActiveKey', (selected) => {
                if (this.name === selected) {
                    this.open = true
                } else {
                    this.open = false
                }
                console.log(selected)
            })
        },
        computed: {
            singleprop: {
                get: function () {
                    return this.single
                },
                // setter
                set: function (newValue) {
                    console.log(newValue)
                    // this.propSingle = newValue
                    // var names = newValue.split(' ')
                    // this.firstName = names[0]
                    // this.lastName = names[names.length - 1]
                }
            }
        },
        methods: {
            toggleItem() {
                this.$parent.$emit('update:activeKey', this.name)
                // this.$parent.$emit('update:pick', this.name)
                if (this.open) {
                    this.open = false
                } else {
                    this.open = true
                    this.$nextTick(() => {
                        //将父组件作为 eventbus
                        //是否只能选中一个
                        if (this.single) {
                            this.$parent.$emit('child', this)
                        }
                    })
                    // this.$parent.$emit('update:selected', this.name)
                    // this.status(this)
                    // this.eventBus && this.eventBus.$emit('update:selected', this)
                }
            },
            close() {
                this.open = false
            },
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
