const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/Input'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {
    it('存在.', () => {
        // expect(Input).to.be.ok //不是 null '' undefined
        expect(Input).to.exist
    })
    describe('props', () => {
        it('接收 value', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
                propsData: {
                    value: '小明'
                }
            }).$mount()
            const InputElement = vm.$el.querySelector('input')
            expect(InputElement.value).to.equal('小明')
            vm.$destroy()
        })
        it('接收 disabled', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
                propsData: {
                    disabled: {
                        value: true
                    }
                }
            }).$mount()
            const InputElement = vm.$el.querySelector('input')
            expect(InputElement.disabled).to.equal(true)
        })
        it('接收 readonly', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
                propsData: {
                    readonly: {
                        value: true
                    }
                }
            }).$mount()
            const InputElement = vm.$el.querySelector('input')
            // console.log(InputElement.outerHTML)
            expect(InputElement.readOnly).to.equal(true)
        })
        it('接收 error', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
                propsData: {
                    error: '出错了'
                    // error: {
                    //     type: String,
                    //     value: '出错了'
                    // }
                }
            }).$mount()
            const InputElement = vm.$el.querySelector('input').parentNode
            const useElement = vm.$el.querySelector('use')
            const errorMessage = vm.$el.querySelector('.errorMessage')
            expect(useElement.getAttribute('xlink:href')).equal('#ierror')
            // console.log(errorMessage.outerHTML)
            expect(errorMessage.innerText).to.equal('出错了')
            // console.log(InputElement.outerHTML)
            expect(InputElement.className).to.contains('error')
        })
    })

    describe('事件', () => {
        it('change 事件', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
            }).$mount()
            const callback = sinon.fake()
            vm.$on('change',callback)
            //相当于这一行中的 @modify
            //<g-input value="小" @modify="inputChange" error="出错了"></g-input>
            //触发change事件
            let event = new Event('change')
            //为 event 手动添加 target
            Object.defineProperty(event,'target',{
                value: {
                    value: 'hi'
                },
                enumerable: true
            })
            //event 浏览器原生事件
            console.log(event)
            let inputElement = vm.$el.querySelector('input')
            console.log(inputElement.outerHTML)
            inputElement.dispatchEvent(event)
            //calledWith(event) change 事件的第一个参数
            expect(callback).to.have.been.calledWith('hi')
            vm.$destroy()
        })
        it('input 事件', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
            }).$mount()
            const callback = sinon.fake()
            vm.$on('input',callback)
            //相当于这一行中的 @modify
            //<g-input value="小" @modify="inputChange" error="出错了"></g-input>
            //触发change事件
            let event = new Event('input')
            Object.defineProperty(event,'target',{
                value: {
                    value: 'hi'
                },
                enumerable: true
            })
            //event 浏览器原生事件
            console.log(event)
            let inputElement = vm.$el.querySelector('input')
            console.log(inputElement.outerHTML)
            inputElement.dispatchEvent(event)
            //calledWith(event) change 事件的第一个参数
            expect(callback).to.have.been.calledWith('hi')
            vm.$destroy()
        })
        it('focus 事件', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
            }).$mount()
            const callback = sinon.fake()
            vm.$on('focus',callback)
            //相当于这一行中的 @modify
            //<g-input value="小" @modify="inputChange" error="出错了"></g-input>
            //触发change事件
            let event = new Event('focus')
            Object.defineProperty(event,'target',{
                value: {
                    value: 'hi'
                },
                enumerable: true
            })
            //event 浏览器原生事件
            console.log(event)
            let inputElement = vm.$el.querySelector('input')
            console.log(inputElement.outerHTML)
            inputElement.dispatchEvent(event)
            //calledWith(event) change 事件的第一个参数
            expect(callback).to.have.been.calledWith('hi')
            vm.$destroy()
        })
        it('blur 事件', () => {
            const Constructor = Vue.extend(Input)
            const vm = new Constructor({
            }).$mount()
            const callback = sinon.fake()
            vm.$on('blur',callback)
            //相当于这一行中的 @modify
            //<g-input value="小" @modify="inputChange" error="出错了"></g-input>
            //触发change事件
            let event = new Event('blur')
            Object.defineProperty(event, 'target', {
                value: {
                    value: 'hi'
                },
                enumerable: true
            })
            //event 浏览器原生事件
            console.log(event)
            let inputElement = vm.$el.querySelector('input')
            console.log(inputElement.outerHTML)
            inputElement.dispatchEvent(event)
            //calledWith(event) change 事件的第一个参数
            expect(callback).to.have.been.calledWith('hi')
            vm.$destroy()
        })
    })

})
