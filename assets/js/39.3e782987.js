(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{281:function(t,o,s){"use strict";s.r(o);var n=s(2),a=Object(n.a)({},function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"toast"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#toast","aria-hidden":"true"}},[t._v("#")]),t._v(" Toast")]),t._v(" "),s("h2",{attrs:{id:"使用方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用方法")]),t._v(" "),s("blockquote",[s("p",[t._v("简单用法")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('导入 插件并 使用\nimport Vue from "vue";\nVue.use(toastplugin);\nimport toastplugin from "toastplugin";\n')])])]),s("ClientOnly",[s("l-toast")],1),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('方法：\nmethods: {\n    showToast1() {\n        // console.log(\'showToast1\')\n      this.$toast("我是Toast", {\n        // closeButton: {\n        //     text: \'关闭呀\',\n        //     callback:(toast) => {\n        //         console.log(\'Toast组件传过来的this\',toast);\n        //         console.log(\'callback this\',this)\n        //         this.toast = \'已经点击Toast\'\n        //         console.log(\'用户点击关闭\')\n        //     }\n        // },\n        autoClose: false,\n        // autoCloseDelay: 2,\n        // enableHtml: true,\n        position: "top"\n      });\n    },\n    showToast2() {\n      this.$toast("我是Toast", {\n        closeButton: {\n          text: "关闭呀",\n          callback: toast => {\n            // console.log("Toast组件传过来的this", toast);\n            // console.log("callback this", this);\n            this.toast = "已经点击Toast";\n            // console.log("用户点击关闭");\n          }\n        },\n        autoClose: false,\n        autoCloseDelay: 2,\n        enableHtml: true,\n        position: "middle"\n      });\n    },\n    showToast3() {\n      this.$toast("我是Toast", {\n        closeButton: {\n          text: "关闭呀",\n          callback: toast => {\n            // console.log("Toast组件传过来的this", toast);\n            // console.log("callback this", this);\n            this.toast = "已经点击Toast";\n            // console.log("用户点击关闭");\n          }\n        },\n        autoClose: true,\n        autoCloseDelay: 2,\n        enableHtml: true,\n        position: "bottom"\n      });\n    }\n  }\n')])])])],1)},[],!1,null,null,null);o.default=a.exports}}]);