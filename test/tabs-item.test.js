const expect = chai.expect;
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsHead from '../src/tabs-head'
import TabsItem from '../src/tabs-item'
import TabsBody from '../src/tabs-body'
import TabsPane from '../src/tabs-pane'

Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-pane', TabsPane)
Vue.config.productionTip = false
Vue.config.devtools = false

describe('TabsItem', () => {
    it('存在.', () => {
        // expect(Input).to.be.ok //不是 null '' undefined
        expect(TabsItem).to.exist
    })
    it('接受 name', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                name: 'hello'
            }
        }).$mount()
        // console.log(vm.$el.outerHTML);
        expect(vm.$el.getAttribute('item-name') === 'hello').to.equal(true)

    })
    it('接收 disabled',() => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                disabled: true
            }
        }).$mount()
        // console.log(vm.$el.outerHTML);
        // expect(vm.$el.classList.contains('disabled')).to.equal(true)
        const callback = sinon.fake();
        vm.$on('click',callback);
        vm.$el.click();
        expect(callback).to.have.not.been.called;
    })

})
