<template>
    <div class="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visiable" @click.stop>
            <slot name="content"></slot>
        </div>
        <span @click="xxx" ref="triggerWapper">
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
            }
        },
        mounted() {
            console.log(this.$refs.triggerWapper);
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
                        document.body.appendChild(this.$refs.contentWrapper)
                        let {width, height, top, left} = this.$refs.triggerWapper.getBoundingClientRect()
                        console.log(width, height, top, left)
                        this.$refs.contentWrapper.style.left = `${left+window.scrollX}px`
                        this.$refs.contentWrapper.style.top = `${top+window.scrollY}px`
                        //() => {}
                        //function(){}.bind(this) bind() 会生成 新的函数
                        let handler = () => {
                            this.visiable = false
                            document.removeEventListener('click', handler)
                        }
                        document.addEventListener('click', handler)
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

    }

    .content-wrapper {
        position: absolute;
        border: 1px red solid;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        transform: translateY(-100%);
    }

</style>
