import Toast from './toast'
export default {
    install(Vue,options){
        Vue.prototype.$toast = function(msg,Toastoptions){
            // let { msg,closeButton,autoClose,autoCloseDelay } = option
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor({
                propsData: {
                    ...Toastoptions
                }
            })
            toast.$slots.default = [msg]
            toast.$mount()
            document.body.appendChild(toast.$el)
            // console.log(msg)
        }
    }
}
