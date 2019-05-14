import Toast from './toast'

let currentToast
export default {
    install(Vue, options) {
        Vue.prototype.$toast = function (msg, Toastoptions) {
            // let { msg,closeButton,autoClose,autoCloseDelay } = option
            if (currentToast) {
                currentToast.close()
            }

            function CreateToast() {
                //创建 Toast组件实例
                let Constructor = Vue.extend(Toast)
                let toast = new Constructor({
                    //组件实例中传入 props
                    propsData: {
                        ...Toastoptions
                    }
                })
                toast.$slots.default = [msg]
                toast.$mount()
                document.body.appendChild(toast.$el)
                //将 toast实例赋值给 变量 currentToast
                // 用来保证页面只有一个Toast实例
                currentToast = toast
            }

            CreateToast()
            // console.log(msg)
        }
    }
}
