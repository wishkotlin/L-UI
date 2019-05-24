<template>
    <div class="outer" :class="toastClseees">
        <div class="toast" ref="toast">
            <div class="msg" :class="{'NoClose': JSON.stringify(closeButton) === '{}'}">
                <div v-if="enableHtml" v-html="$slots.default[0]"></div>
                <slot v-else></slot>
                <!--            <slot></slot>-->

            </div>
            <div class="line" ref="line" v-show="JSON.stringify(closeButton) !== '{}'"></div>
            <span class="close" v-show="JSON.stringify(closeButton) !== '{}'"
                  @click="onclickClose">{{closeButton.text}}</span>
        </div>
    </div>

</template>

<script>
    //构造组件的选项
    export default {
        name: "l-g-toast",
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
                        // text: '关闭',
                        // callback: undefined
                        // //     (toast) => {
                        // //     toast.close()
                        // // }
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
                    // console.log(this.autoCloseDelay);
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
                // console.log('close')
                this.$el.remove()
                this.$emit('close')
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
                // console.log('callback调用')
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
    @keyframes slide-up {
        0% {opacity: 0;transform: translateY(100%)}
        100% {opacity: 1;transform: translateY(0)}
    }

    @keyframes slide-down {
        0% {opacity: 0;transform: translateY(-100%)}
        100% {opacity: 1;transform: translateY(0)}
    }

    @keyframes slide-middle {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

    .outer {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        $animation-time: 300ms;

        &.toast-top {
            top: 0;
            transform: translateX(-50%);

            .toast {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                animation: slide-down $animation-time;
            }
        }

        &.toast-bottom {
            top: unset;
            bottom: 0;
            transform: translateX(-50%);

            .toast {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                animation: slide-up $animation-time;
            }
        }

        &.toast-middle {
            top: 50%;
            transform: translate(-50%, -50%);

            .toast {
                animation: slide-middle $animation-time;
            }
        }

        .toast {
            /*animation: fade-in 1s;*/
            /*border: 1px solid red;*/

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

            .NoClose {
                padding-right: unset;
                padding-top: 8px;
                padding-bottom: 8px;
            }

            .line {
                border-left: 1px #fff solid;
                height: 100%;
            }


        }
    }


</style>
