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

describe('TabsPane', () => {
    it('存在.', () => {
        // expect(Input).to.be.ok //不是 null '' undefined
        expect(TabsPane).to.exist
    })
    it('接受 name', () => {
        const Constructor = Vue.extend(TabsPane)
        const vm = new Constructor({
            data(){
              return {
                  active: true
              }
            },
            propsData: {
                name: 'hello'
            }
        }).$mount()
        console.log('html',vm.$el.outerHTML);
        expect(vm.$el.className.includes('active')).to.equal(true)
    })

})
