<template>
    <div class="popover">
        <div class="content-wrapper" v-if="visiable" @click.stop>
            <slot name="content"></slot>
        </div>
        <div @click="xxx">
            <slot name="trigger"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popover",
        data() {
            return {
                visiable: false
            }
        },
        methods: {
            async xxx(event) {
                // console.log(event)
                //阻止默认事件
                event.preventDefault()
                //阻止冒泡
                event.stopPropagation()
                this.visiable = !this.visiable
                if (this.visiable === true) {
                    this.$nextTick(() => {
                        //() => {}
                        //function(){}.bind(this) bind() 会生成 新的函数
                        let handler = () => {
                            this.visiable = false
                            document.removeEventListener('click',handler)
                        }
                        document.addEventListener('click',handler)
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;

        .content-wrapper {
            position: absolute;
            bottom: 100%;
            left: 0;
            border: 1px red solid;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }
    }

</style>
