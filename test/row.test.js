const expect = chai.expect;
import Vue from 'vue'
import Row from '../src/row'
import Col from '../src/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
    it('存在.', () => {
        // expect(Input).to.be.ok //不是 null '' undefined
        expect(Row).to.exist
    })
    it('接收gutter属性', (done) => {
        Vue.component('g-row',Row)
        Vue.component('g-col',Col)
        const div = document.createElement('div')
        document.body.appendChild(div)
        // const RowConstructor = Vue.extend(Row)
        // const ColConstructor = Vue.extend(Col)
        // const row = new RowConstructor({
        //     propsData: {
        //         gutter: 10
        //     }
        // })
        // const col = new ColConstructor()
        div.innerHTML = `
        <g-row gutter="20">
        <g-col span="12"></g-col>
        <g-col span="12"></g-col>
        </g-row>
        `
        const vm = new Vue({
            el: div
        })
        setTimeout(() => {
            // console.log(vm.$el.outerHTML)
            const cols = vm.$el.querySelectorAll('.col')
            expect(getComputedStyle(cols[0]).padding).to.equal('0px 10px')
            vm.$destroy()
            div.remove()
            done()
            //测试代码 有 异步 添加 done()

        },0)
        // console.log(vm.$el.outerHTML)
        // expect(InputElement.value).to.equal('小明')
    })
})
