const expect = chai.expect;
import Vue from 'vue'
import Toast from '../src/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
    it('存在.', () => {
        // expect(Input).to.be.ok //不是 null '' undefined
        expect(Toast).to.exist
    })
    describe('props', () => {

        it('接收 autoClose  ', function (done) {
            //这个测试用例 等2s
            // this.timeout(1500)
            const div = document.createElement('div')
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    autoClose: true,
                    autoCloseDelay: 1
                }
            }).$mount(div)

            //$on 监听自定义事件
            vm.$on('close', function () {
                console.log(111)
                console.log(document.body.contains(vm.$el));
                expect(document.body.contains(vm.$el)).to.equal(false)
                vm.$el.remove()
                vm.$destroy()
                done()
            })


            // setTimeout(() => {
            //     console.log(document.body.contains(vm.$el));
            //     expect(document.body.contains(vm.$el)).to.equal(false)
            //     done()
            // },1500)

            // const element = vm.$el.classList
            // expect(element.contains('col-wide-1')).to.equal(true)
            // expect(element.contains('col-wide-offset-2')).to.equal(true)
            // div.remove()
            // vm.$destroy()
        });

        it('接收 autoCloseDelay', (done) => {
            const div = document.createElement('div')
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    autoClose: true,
                    autoCloseDelay: 1
                }
            }).$mount(div)
            setTimeout(() => {
                console.log(document.body.contains(vm.$el));
                expect(document.body.contains(vm.$el)).to.equal(false)
                div.remove()
                vm.$destroy()
                done()
            }, 1000)

        })

        it('接收 closeButton', (done) => {
            const div = document.createElement('div')
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                autoClose: false,
                propsData: {
                    closeButton: {
                        text: '关闭呀',
                        callback: (toast) => {
                            console.log('Toast组件传过来的this', toast);
                            console.log('callback this', this)
                            this.toast = '已经点击Toast'
                            console.log('用户点击关闭')
                        }
                    }

                }
            }).$mount(div)
            // console.log(document.body.contains(vm.$el));
            setTimeout(() => {
                console.log(vm.$el.querySelector('.close'));
                expect(vm.$el.querySelector('.close').textContent).to.equal('关闭呀')
                done()
            }, 1000)

            // div.remove()
            // vm.$destroy()


        })
    })

    // it('接收 wide属性', () => {
    //     const div = document.createElement('div')
    //     const Constructor = Vue.extend(Toast)
    //     const vm = new Constructor({
    //         propsData: {
    //             wide: {span: 1,offset: 2}
    //         }
    //     }).$mount(div)
    //     const element = vm.$el.classList
    //     expect(element.contains('col-wide-1')).to.equal(true)
    //     expect(element.contains('col-wide-offset-2')).to.equal(true)
    //     div.remove()
    //     vm.$destroy()
    // })
    // it('接收gutter属性', (done) => {
    //     Vue.component('g-row',Toast)
    //     const div = document.createElement('div')
    //     document.body.appendChild(div)
    //     // const RowConstructor = Vue.extend(Row)
    //     // const ColConstructor = Vue.extend(Col)
    //     // const row = new RowConstructor({
    //     //     propsData: {
    //     //         gutter: 10
    //     //     }
    //     // })
    //     // const col = new ColConstructor()
    //     div.innerHTML = `
    //     <g-row gutter="20">
    //     <g-col span="12"></g-col>
    //     <g-col span="12"></g-col>
    //     </g-row>
    //     `
    //     const vm = new Vue({
    //         el: div
    //     })
    //     setTimeout(() => {
    //         console.log(vm.$el.outerHTML)
    //         const cols = vm.$el.querySelectorAll('.col')
    //         expect(getComputedStyle(cols[0]).padding).to.equal('0px 10px')
    //         vm.$destroy()
    //         div.remove()
    //         done()
    //         //测试代码 有 异步 添加 done()
    //
    //     },0)
    //     console.log(vm.$el.outerHTML)
    //     // expect(InputElement.value).to.equal('小明')
    // })
})
