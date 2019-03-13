<template>
  <div class="g-button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  mounted() {
    //   console.log(this.$children)
    // console.log(this.$el.children)
    for (let node of this.$el.children) {
      // console.log(node)
      let name = node.nodeName.toLowerCase();
      if (name !== "button") {
        console.warn(`g-button的子元素应该都是g-button,你写的是${name}`);
      }
    }
  }
};
</script>
<style lang="scss">
.g-button-group {
  display: inline-flex;
  vertical-align: middle;
  > .g-button {
    border-radius: 0;
    // &:not(:first-child){
    //     border-left: none;
    // }
    // 解决只显示三个border的问题
    margin-left: -1px;
    &:first-child {
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }
    &:last-child {
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
    // 解决只显示三个border的问题
    &:hover {
      position: relative;
      z-index: 1;
    }
  }
}
</style>


