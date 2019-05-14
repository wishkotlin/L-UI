<template>
    <div class="toast" ref="toast" :class="toastClseees">
        <div class="msg">
            <div v-if="enableHtml" v-html="$slots.default[0]"></div>
            <slot v-else></slot>
            <!--            <slot></slot>-->

        </div>
        <div class="line" ref="line"></div>
        <span class="close" v-if="closeButton" @click="onclickClose">
            {{closeButton.text}}
        </span>
    </div>
</template>

<script>
    //构造组件的选项
    export default {
        name: "g-toast",
        props: {
            autoClose: {
                type: Boolean,
                default: true
            },
            autoCloseDelay: {
                type: Number,
                default: 2
            },
            closeButton: {
                type: Object,
                default: () => {
                    return {
                        text: '关闭',
                        callback: undefined
                        //     (toast) => {
                        //     toast.close()
                        // }
                    }
                }
            },
            enableHtml: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'middle', 'bottom'].indexOf(value) >= 0
                }
            }
        },
        created() {
            // console.log(this.closeButton);
        },
        mounted() {
            //自动消失
            if (this.autoClose) {
                setTimeout(() => {
                    this.close()
                }, this.autoCloseDelay * 1000)
            }
            this.$nextTick(() => {
                // console.log(this.$refs.toast.getBoundingClientRect().height);
                this.$refs.line.style.height = this.$refs.toast.getBoundingClientRect().height + 'px'
            })
        },
        methods: {
            close() {
                //元素 移除
                console.log('close')
                this.$el.remove()
                this.$emit('beforeClose')
                //把一些事件取消掉
                this.$destroy()
            },
            onclickClose() {
                this.close()
                if (this.closeButton.callback && typeof this.closeButton.callback === 'function') {
                    this.closeButton.callback(this)//this === Toast 实例
                }
            },
            log() {
                console.log('callback调用')
            }
        },
        computed: {
            toastClseees() {
                return [`toast-${this.position}`] || 'toast-top'
            }
        }
    }
</script>

<style lang="scss" scoped>
    $font-size: 14px;
    $toast-min-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    @keyframes fade-in {
        0% {opacity: 0;transform: translateY(100%)}
        100% {opacity: 1;transform: translateY(0)}
    }

    .toast {
        animation: fade-in 1s;
        /*border: 1px solid red;*/
        position: fixed;
        left: 50%;
        font-size: $font-size;
        //line-height: $toast-height;
        min-height: $toast-min-height;
        display: flex;
        align-items: center;
        background: $toast-bg;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.50);
        border-radius: 4px;
        color: #fff;
        //4的倍数 或者 8 的倍数
        padding: 0 16px;

        .close {
            padding-left: 16px;
            /*border-left: 1px #fff solid;*/
            text-align: center;
            cursor: pointer;
            //大小不缩
            flex-shrink: 0;
        }

        .msg {
            padding-right: 16px;
            padding-top: 8px;
            padding-bottom: 8px;
        }

        .line {
            border-left: 1px #fff solid;
            height: 100%;
        }

        &.toast-top {
            top: 0;
            transform: translateX(-50%);
        }

        &.toast-bottom {
            top: unset;
            bottom: 0;
            transform: translateX(-50%);
        }

        &.toast-middle {
            top: 50%;
            transform: translate(-50%, -50%);
        }


    }

</style>
