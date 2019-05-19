<template>
    <div class="popover" @click="Onclick" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visiable">
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
        mounted() {
            // console.log(this.$refs.triggerWrapper);
        },
        methods: {
            close() {
                this.visiable = false
                document.removeEventListener('click', this.handler)
            },
            PositionContentWrapper() {
                document.body.appendChild(this.$refs.contentWrapper)
                let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
                // console.log(width, height, top, left)
                this.$refs.contentWrapper.style.left = `${left + window.scrollX}px`
                this.$refs.contentWrapper.style.top = `${top + window.scrollY}px`
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
        .triggerWrapper{
            display: inline-block;
        }
    }

    .content-wrapper {
        position: absolute;
        /*border: 1px solid  $border-color;*/
        border-radius: $border-radius;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        transform: translateY(-100%);
        margin-top: -10px;
        padding: 0.5em 1em;
        max-width: 20em;
        word-break: break-word;
        .popover-arrow{
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
</style>
