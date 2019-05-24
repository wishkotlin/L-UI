<template>
    <div class="popover" ref="popover">
        <transition name="fade">
            <div ref="contentWrapper" class="content-wrapper" v-if="visiable" :class="{[`position-${position}`]:true}">
                <slot name="content"></slot>
                <div class="popover-arrow"></div>
            </div>
        </transition>
        <span class="triggerWrapper" ref="triggerWrapper">
             <slot name="trigger"></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "l-popover",
        data() {
            return {
                visiable: false,
                hoverClose: null,
            };
        },
        props: {
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
                }
            },
            trigger: {
                type: String,
                default: 'click',
                validator(value) {
                    return ['click', 'hover'].indexOf(value) >= 0
                }
            }
        },
        computed: {
            openEvent() {
                if (this.trigger === 'click') {
                    return 'click'
                } else if (this.trigger === 'hover') {
                    return 'mouseover'
                }
            },
            closeEvent() {
                if (this.trigger === 'click') {
                    return 'click'
                } else if (this.trigger === 'hover') {
                    return 'mouseleave'
                }
            },
        },
        mounted() {
            switch (this.trigger) {
                case "click":
                    //手动添加事件监听 需要 在destoy 里面移除
                    this.$refs.popover.addEventListener('click', this.Onclick)
                    break;
                case 'hover':
                    this.$refs.popover.addEventListener('mouseenter', this.OnShow)
                    this.$refs.popover.addEventListener('mouseleave', () => {
                        this.hoverClose = setTimeout(() => {
                            this.visiable = false
                            // this.close
                        }, 300)
                        // this.$nextTick(() => {
                        this.$refs.contentWrapper && this.$refs.contentWrapper.addEventListener('mouseenter', this.contentMouseenter)
                        this.$refs.contentWrapper && this.$refs.contentWrapper.addEventListener('mouseleave', this.contentMouseleave)
                        // })

                    })
                    break;
            }
        },
        destroyed() {
            switch (this.trigger) {
                case "click":
                    //手动添加事件监听 需要 在destoy 里面移除
                    this.$refs.popover.removeEventListener('click', this.Onclick)
                    break;
                case 'hover':
                    this.$refs.popover.removeEventListener('mouseenter', this.OnShow)
                    clearTimeout(this.hoverClose)
                    this.$refs.popover.removeEventListener('mouseleave', this.close)
                    break;
            }
        },
        methods: {
            debounce(fn, wait) {
                let timeout = null;
                console.log(fn)
                return () => {
                    if (timeout !== null)
                        clearTimeout(timeout);
                    timeout = setTimeout(fn, wait);
                }
            },
            contentMouseenter(e) {
                // console.log(e.target)
                //清除 timeout
                clearTimeout(this.hoverClose)
                this.$nextTick(() => {
                    this.visiable = true
                })
            },
            contentMouseleave(e) {
                // console.log(e.target)
                // console.log(this.$refs.contentWrapper.contains(e.target))
                this.$refs.popover.addEventListener('mouseenter', (e) => {
                    if (this.$refs.popover && (this.$refs.popover.contains(e.target) || this.$refs.popover.contains(e.target))) {
                        clearTimeout(MouseleaveTime)
                        this.visiable = true
                    }
                })
                let MouseleaveTime = setTimeout(() => {
                    this.visiable = false
                }, 500)
            },
            close() {
                this.visiable = false
                document.removeEventListener('click', this.handler)
            },
            PositionContentWrapper() {
                const {contentWrapper, triggerWrapper} = this.$refs
                document.body.appendChild(contentWrapper)
                const {height: ConHeight} = contentWrapper.getBoundingClientRect()
                const {height: ConLeft} = contentWrapper.getBoundingClientRect()
                // let {height: ConHeight} = contentWrapper.getBoundingClientRect()
                const {width, height, top, left} = triggerWrapper.getBoundingClientRect()
                //表编程
                let Positions = {
                    top: {
                        top: `${top + window.scrollY}`,
                        left: `${left + window.scrollX}`
                    },
                    bottom: {
                        top: `${top + window.scrollY + height}`,
                        left: `${left + window.scrollX}`
                    },
                    left: {
                        top: `${top + window.scrollY - Math.abs(ConHeight - height) / 2}`,
                        left: `${left + window.scrollX}`
                    },
                    right: {
                        top: `${top + window.scrollY - Math.abs(ConHeight - height) / 2}`,
                        left: `${left + window.scrollX - Math.abs(ConLeft - left)}`
                    }
                }
                contentWrapper.style.left = Positions[this.position].left + 'px'
                contentWrapper.style.top = Positions[this.position].top + 'px'
            },
            handler(e) {
                //如果点击区域不是 内容区域 把内容区域关掉
                // if (this.$refs.popover &&
                //     (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))
                // ) { return }
                // this.close()
                if (this.$refs.popover && (this.$refs.popover.contains(e.target) || this.$refs.popover.contains(e.target))) {
                    //popover 以内的区域
                } else {
                    //popover 以外的区域
                    //判断 contentWrapper 是否包含 监听 click 事件的点击区域
                    if (!(this.$refs.contentWrapper && (this.$refs.contentWrapper.contains(e.target) || this.$refs.contentWrapper.contains(e.target)))) {
                        if (this.trigger === 'click') {
                            this.close()
                        }
                        // this.close()
                    }
                }
            },
            ListenToDoc() {
                document.addEventListener('click', this.handler)
            },
            OnShow() {
                this.visiable = true
                // this.visiable = true
                this.$nextTick(() => {
                    this.PositionContentWrapper()
                })
                setTimeout(() => {
                    //() => {}
                    //function(){}.bind(this) bind() 会生成 新的函数
                    this.ListenToDoc()
                }, 0)
            },
            Onclick(event) {
                if (this.$refs.triggerWrapper.contains(event.target)) {
                    // this.visiable = !this.visiable
                    if (this.visiable === true) {
                        this.close()
                    } else {
                        this.OnShow()
                    }
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    $border-color: #333;
    $border-radius: 4px;
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;

        .triggerWrapper {
            display: inline-block;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .content-wrapper {
        position: absolute;
        /*border: 1px solid  $border-color;*/
        border-radius: $border-radius;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        padding: 0.5em 1em;
        max-width: 20em;
        word-break: break-word;
        background: #fff;

        &.position-top {
            transform: translateY(-100%);
            margin-top: -10px;

            .popover-arrow {
                width: 8px;
                height: 8px;
                display: block;
                position: absolute;
                top: calc(100% - 5px);
                left: 10px;
                transform: rotate(45deg);
                border-top-color: transparent;
                border-right-color: #fff;
                border-bottom-color: #fff;
                border-left-color: transparent;
                box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
                border-style: solid;
                border-width: 4px;
                position: absolute;
            }
        }

        &.position-bottom {
            margin-top: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

            .popover-arrow {
                width: 8px;
                height: 8px;
                display: block;
                position: absolute;
                top: -4px;
                left: 10px;
                transform: rotate(45deg);
                border-top-color: #fff;
                border-right-color: transparent;
                border-bottom-color: transparent;
                border-left-color: #fff;
                box-shadow: -2px -1px 7px rgba(0, 0, 0, 0.07);
                border-style: solid;
                border-width: 4px;
                position: absolute;
            }
        }

        &.position-left {
            transform: translateX(-100%);
            margin-left: -10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

            .popover-arrow {
                width: 8px;
                height: 8px;
                display: block;
                position: absolute;
                top: 50%;
                left: calc(100% - 4px);
                transform: translateY(-50%) rotate(45deg);
                border-top-color: #fff;
                border-right-color: #fff;
                border-bottom-color: transparent;
                border-left-color: transparent;
                box-shadow: 6px -1px 7px rgba(0, 0, 0, 0.07);
                border-style: solid;
                border-width: 4px;
                position: absolute;
            }
        }

        &.position-right {
            transform: translateX(100%);
            /*margin-left: 10px;*/
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

            .popover-arrow {
                width: 8px;
                height: 8px;
                display: block;
                position: absolute;
                top: 50%;
                left: -4px;
                transform: translateY(-50%) rotate(45deg);
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: #fff;
                border-left-color: #fff;
                box-shadow: -3px -1px 7px rgba(0, 0, 0, 0.07);
                border-style: solid;
                border-width: 4px;
                position: absolute;
            }
        }

    }
</style>
