import Vue from "vue";
import Button from "./button.vue";
import Icon from "./Icon.vue";
import ButtonGroup from "./buttongroup.vue";
Vue.component("g-button", Button); //组件注册
Vue.component("g-icon", Icon);
Vue.component("g-buttongroup", ButtonGroup);
new Vue({
  el: "#app",
  data: {
    loading1: false,
    loading2: false,
    loading3: true
  }
  // render: h=>h(App)
});
