import Vue from "vue";
import Button from "./button.vue";
import Icon from "./icon.vue";
import ButtonGroup from "./buttongroup.vue";
import Input from "./Input.vue";

Vue.component("g-button", Button); //组件注册
Vue.component("g-icon", Icon);
Vue.component("g-buttongroup", ButtonGroup);
Vue.component("g-input", Input)
new Vue({
    el: "#app",
    data: {
        loading1: false,
        loading2: false,
        loading3: true
    }
    // render: h=>h(App)
});

// /**
//  * 导入
//  */
// import chai from "chai";
// import spies from "chai-spies";
// chai.use(spies);
// const expect = chai.expect;
// /**
//  * try catch 捕获异常
//  */
// try{
// //单元测试
// {
//   const Constractor = Vue.extend(Button); //把button 按钮变成构造函数
//   const button = new Constractor({
//     propsData: {
//       icon: "setting"
//     }
//   }); //通过构造函数 生成实例
//   button.$mount();//挂载到内存里面
//   // button.$mount(".test"); //动态生成按钮 实例挂载到.test上
//   let useElement = button.$el.querySelector("use");
//   console.log(useElement);
//   let href = useElement.getAttribute("xlink:href");
//   expect(href).to.eq("#isetting");
//
//   // 测试完成 删掉button元素 防止占内存
//   button.$el.remove();
//   button.$destroy();
// }
//
// {
//   const Constractor = Vue.extend(Button); //把button 按钮变成构造函数
//   const button = new Constractor({
//     propsData: {
//       icon: "setting",
//       loading: true
//     }
//   });
//   //   button.$mount(".test"); //动态生成按钮 实例挂载到.test上
//   button.$mount();
//   let useElement = button.$el.querySelector("use");
//   console.log(useElement);
//   let href = useElement.getAttribute("xlink:href");
//   expect(href).to.eq("#iloading");
//
//   // 测试完成 删掉button元素
//   button.$el.remove();
//   button.$destroy();
// }
// {
//   //测试flex 的order
//   const div = document.createElement("div");
//   document.body.appendChild(div);
//   const Constractor = Vue.extend(Button); //把button 按钮变成构造函数
//   const button = new Constractor({
//     propsData: {
//       icon: "setting",
//       // loading: true
//       iconposition: "right"
//     }
//   });
//   //   button.$mount(".test"); //动态生成按钮 实例挂载到.test上
//   button.$mount(div);
//   let svg = button.$el.querySelector("svg");
//   console.log(svg);
//   // let order = window.getComputedStyle(svg).order;
//   let { order } = window.getComputedStyle(svg);
//   expect(order).to.eq("2"); //CSS的所有都是字符串
//
//   // 测试完成 删掉button元素
//   button.$el.remove();
//   button.$destroy();
// }
//
// {
//   //测试监听 CLICK
//   // const div = document.createElement("div");
//   // document.body.appendChild(div);
//   const Constractor = Vue.extend(Button); //把button 按钮变成构造函数
//   const gbuttton = new Constractor({
//     propsData: {
//       icon: "setting"
//       // loading: true
//       // iconposition: 'right'
//     }
//   });
//   gbuttton.$mount(".test"); //动态生成按钮 实例挂载到.test上
//   gbuttton.$mount();
//   gbuttton.$on("click", function(msg) {
//     console.log("1" + msg);
//   });
//
//   gbuttton.$emit("click", 1);
// }
//
// {
//   // mock 函数的 希望 是受控制的
//   const Constructor = Vue.extend(Button);
//   const vm = new Constructor({
//     propsData: {
//       icon: "settings"
//     }
//   });
//   vm.$mount();
// /**
//  * chai spies
//  */
// let spy = chai.spy(function(){
//   console.log('调用了')
// })
//   vm.$on("click",
//   spy()
//   // function() {
//   //   console.log("111");
//   //   // expect(1).to.eq(1);
//   // }
//   );
//   // 希望这个函数被执行
//   let button = vm.$el;
//   button.click();
//
//   expect(spy).to.have.been.called()
//   /**
//    * 希望 这个 spy函数 被调用
//    */
// }
//
// }catch(error){
//   window.errors = [error]
// }finally{
//   window.errors && window.errors.forEach(item => {
//     console.log(item.message)
//   });
// }
