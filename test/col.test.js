const expect = chai.expect;
import Vue from 'vue'
import Row from '../src/row'
import Col from '../src/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Col', () => {
    it('存在.', () => {
        // expect(Input).to.be.ok //不是 null '' undefined
        expect(Col).to.exist
    })

    it('接收 span', () => {
        const divcol = document.createElement('div')
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                span: 1
            }
        }).$mount(divcol)
        const element = vm.$el.classList
        expect(element.contains('col-1')).to.equal(true)
        divcol.remove()
        vm.$destroy()
    })


    it('接收 pc属性', () => {
        const div = document.createElement('div')
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                pc: {span: 1,offset: 2}
            }
        }).$mount(div)
        const element = vm.$el.classList
        expect(element.contains('col-pc-1')).to.equal(true)
        expect(element.contains('col-pc-offset-2')).to.equal(true)
        div.remove()
        vm.$destroy()
    })
    it('接收 ipad属性', () => {
        const div = document.createElement('div')
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                ipad: {span: 1,offset: 2}
            }
        }).$mount(div)
        const element = vm.$el.classList
        expect(element.contains('col-ipad-1')).to.equal(true)
        expect(element.contains('col-ipad-offset-2')).to.equal(true)
        div.remove()
        vm.$destroy()
    })

    it('接收 narrow属性', () => {
        const div = document.createElement('div')
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                narrow: {span: 1,offset: 2}
            }
        }).$mount(div)
        const element = vm.$el.classList
        expect(element.contains('col-narrow-1')).to.equal(true)
        expect(element.contains('col-narrow-offset-2')).to.equal(true)
        div.remove()
        vm.$destroy()
    })

    it('接收 wide属性', () => {
        const div = document.createElement('div')
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                wide: {span: 1,offset: 2}
            }
        }).$mount(div)
        const element = vm.$el.classList
        expect(element.contains('col-wide-1')).to.equal(true)
        expect(element.contains('col-wide-offset-2')).to.equal(true)
        div.remove()
        vm.$destroy()
    })

})
