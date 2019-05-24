---
title: '快速开始'
---
## 使用之前
在使用Xue-ui之前，我们假设您已经了解Vue、Vue组件、Vue单文件组件的基础知识。
## 引入L UI
### 1. 安装脚手架工具
[vue-cli](https://cli.vuejs.org/zh/guide/installation.html)
> 我们推荐使用 Vue-cli 创建项目并使用 L UI
```vue
$ npm install -g @vue/cli
# OR
$ yarn global add @vue/cli
```
### 2. 创建一个项目

  使用命令初始化以及配置项目
```vue
$ vue create antd-demo
```
> 若安装缓慢报错，可尝试用 cnpm 或别的镜像源自行安装：`rm -rf node_modules && cnpm install`。
windows用户可以使用`rd /s/q node_modules && cnpm install`

### 3. 安装组件
```vue
$ npm i @liulinboyi/l-ui
#OR
$ yarn add @liulinboyi/l-ui
```
### 4. 使用Vue-cli创建项目后，在main.js中可以这样按需引用L UI
```vue
import Vue from "vue";
import App from "./App.vue";
import { Button } from '@liulinboyi/l-ui'

Vue.component(Button.name, Button)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

```
# 兼容性

L UI支持所有的现代浏览器
