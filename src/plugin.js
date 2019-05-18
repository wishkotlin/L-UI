import Toast from './toast'
//暂存 上一次的 currentToast
let currentToast = null
export default {
    install(Vue, options) {
        Vue.prototype.$toast = function (msg, Toastoptions) {
            // let { msg,closeButton,autoClose,autoCloseDelay } = option
            // console.log('currentToast',currentToast);
            //toast.$on('beforeClose', () => {
            //                     currentToast = null
            //                 })
            //如果 close()方法中 $commit 不执行这句 currentToast 还是组件 不会是 null 或者 undefined

            if (currentToast) {
                currentToast.close()
                // console.log('currentToast',currentToast);
            }
            // console.log('currentToast',currentToast);
            function CreateToast() {
                //创建 Toast组件实例
                let Constructor = Vue.extend(Toast)
                let toast = new Constructor({
                    //组件实例中传入 props
                    propsData: Toastoptions,
                    
                })
                toast.$slots.default = [msg]
                toast.$mount()
                //自定义事件 beforeClose
                toast.$on('beforeClose', () => {
                    console.log('CreateToast', currentToast);
                    currentToast = null//设置上一个currentToast 为null
                })
                toast.$on('close', () => {
                    console.log(1111)
                })
                document.body.appendChild(toast.$el)
                //将 toast实例赋值给 变量 currentToast
                // 用来保证页面只有一个Toast实例
                currentToast = toast
                // console.log('Toast',currentToast);
            }

            CreateToast()
            // console.log(msg)
        }
    }
}
