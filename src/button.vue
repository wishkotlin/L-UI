<template>
  <!-- 单文件组件 -->
  <button class="g-button" :class="{[`icon-${iconposition}`] : true}" @click="$emit('loading')">
    <!-- 传变量 -->
    <!-- <svg v-if="icon" class="icon"><use :xlink:href="`#i${icon}`"></use></svg> -->
    <g-icon class="icon" v-if="icon && !loading" :name="icon"></g-icon>
    <g-icon v-if="loading" class="loading icon" name="loading"></g-icon>
    <!-- v-bind绑定 模板字符串 -->
    <div class="contnet">
      <slot></slot>
    </div>
    <!--1. 插槽 -->
  </button>
</template>
<script>
import Icon from "./icon.vue";
export default {
  name:'l-button',
  components: {
    "g-icon": Icon
  },
  // props: ["icon","iconposition"]//传参
  props: {
    //props新写法
    icon: {},
    loading: {
      type: Boolean,
      default: false
    },
    iconposition: {
      type: String, //类型
      default: "left", //默认值
      validator(value) {
        //属性检查器 自定义验证函数
        // console.log(value)
        if (value !== "left" && value !== "right") {
          return false;
        } else {
          return true;
        }
        // 1.return ['left', 'right'].indexOf(value) !== -1
      }
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
$button-height: 32px;
$font-size: 14px;
$button-bg: white;
$button-active-bg: #eee;
$border-radius: 4px;
$color: #999;
$border-color: #999;
$border-color-hover: #666;
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.g-button {
  font-size: $font-size;
  height: $button-height;
  padding: 0 1em;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  background: $button-bg;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  // 解决行内元素对不齐的属性
  > .icon {
    order: 1;
    margin-right: 0.1em;
    margin-left: 0;
  }
  > .contnet {
    order: 2;
    line-height: 1em;
  }
  &:hover {
    border-color: $border-color-hover;
  }
  &:active {
    background: $button-active-bg;
  }
  &:focus {
    outline: none;
  }
  &.icon-right {
    > .icon {
      order: 2;
      margin-left: 0.1em;
      margin-right: 0;
    }
    > .contnet {
      order: 1;
      line-height: 1em;
    }
  }
  .loading {
    animation: spin 2s infinite linear;
  }
}
</style>
