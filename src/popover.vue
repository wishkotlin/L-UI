<template>
    <div class="popover" @click="Onclick" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visiable" :class="{[`position-${position}`]:true}">
            <slot name="content"></slot>
            <div class="popover-arrow"></div>
        </div>
        <span class="triggerWrapper" ref="triggerWrapper">
             <slot name="trigger"></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "popover",
        data() {
            return {
                visiable: false
            };
        },
        props: {
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
                }
            }
        },
        mounted() {
            // console.log(this.$refs.triggerWrapper);
        },
        methods: {
            close() {
                this.visiable = false
                document.removeEventListener('click', this.handler)
            },
            PositionContentWrapper() {
                const { contentWrapper,triggerWrapper } = this.$refs
                document.body.appendChild(contentWrapper)
                let {width, height, top, left} = triggerWrapper.getBoundingClientRect()
                // console.log(width, height, top, left)
                if (this.position === 'top') {
                    contentWrapper.style.left = `${left + window.scrollX}px`
                    contentWrapper.style.top = `${top + window.scrollY}px`
                } else if (this.position === 'bottom') {
                    contentWrapper.style.left = `${left + window.scrollX}px`
                    contentWrapper.style.top = `${top + window.scrollY + height}px`
                }else if(this.position === 'left'){
                    contentWrapper.style.left = `${left + window.scrollX}px`
                    let { height: ConHeight} = contentWrapper.getBoundingClientRect()
                    contentWrapper.style.top = `${top + window.scrollY - Math.abs(ConHeight - height) / 2}px`
                }


            },
            handler(e) {
                console.log(e.target)
                //如果点击区域不是 内容区域 把内容区域关掉
                console.log(this.$refs.popover.contains(e.target));
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
                        this.close()
                    }
                }
            },
            ListenToDoc() {
                document.addEventListener('click', this.handler)
            },
            OnShow() {
                this.visiable = true
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
                console.log(this.$refs.triggerWrapper, event.target);
                if (this.$refs.triggerWrapper.contains(event.target)) {
                    // console.log("下面");
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

    }
</style>
