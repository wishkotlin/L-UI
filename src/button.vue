<template>
<!-- 单文件组件 -->
    <button class="g-button" :class="{[`icon-${iconposition}`] : true}">
        <!-- 传变量 -->
        <!-- <svg v-if="icon" class="icon"><use :xlink:href="`#i${icon}`"></use></svg> -->
        <g-icon class="icon" v-if="icon" :name="icon"></g-icon>
        <!-- v-bind绑定 模板字符串 -->
        <div class="contnet">
        <slot></slot>
        </div>
        <!--1. 插槽 -->
    </button>
</template>
<script>
   export default {
    // props: ["icon","iconposition"]//传参
    props:{//props新写法
        icon:{},
        iconposition:{
            type:String,//类型
            default: 'left',//默认值
            validator(value){//属性检查器 自定义验证函数
                // console.log(value)
                if(value !== 'left' && value !== 'right'){
                    return false
                }else{
                    return true
                }
                // 1.return ['left', 'right'].indexOf(value) !== -1
            }
        }
    }
   }
</script>
<style lang="scss">
    .g-button{
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        background: var(--button-bg);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        // 解决行内元素对不齐的属性
        > .icon{
            order: 1;
            margin-right: .1em;
            margin-left: 0;
        }
        > .contnet{
            order: 2;
            line-height: 1em;
        }
        &:hover{
            border-color: var(--border-color-hover);
        }
        &:active{
            background: var(--button-active-bg);
        }
        &:focus{
            outline: none;
        }
        &.icon-right{
            >.icon{
                order: 2;
                margin-left: .1em;
                margin-right: 0;
            }
            > .contnet{
                order: 1;
                line-height: 1em;
            }
        }
    }

</style>