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

describe('Tabs', () => {
    it('存在.', () => {
        // expect(Input).to.be.ok //不是 null '' undefined
        expect(Tabs).to.exist
    })
    it('接收 selected', (done) => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
               <g-tabs selected="finance" direction="Horizontal">
               <g-tabs-head>
               <g-tabs-item name="woman" >美女</g-tabs-item>
               <g-tabs-item name="finance">财经</g-tabs-item> 
               <g-tabs-item name="sports">体育</g-tabs-item> 
               </g-tabs-head>
               <g-tabs-body>
               <g-tabs-pane name="woman">美女相关</g-tabs-pane>
               <g-tabs-pane name="finance">财经相关</g-tabs-pane>
               <g-tabs-pane name="sports">体育相关</g-tabs-pane>
               </g-tabs-body>
               </g-tabs>
        `
       const vm =  new Vue({
            el:div
        })
        vm.$nextTick(() => {
            // console.log(vm.$el.outerHTML);
            // console.log(vm.$el.querySelector('.active').textContent);
            expect(vm.$el.querySelector('.active').textContent === '财经').to.equal(true)
            done()
        })
        // vm.$el.remove()
        // vm.$destroy()
    })
    it('可以接受 direction',() => {

    })
})
