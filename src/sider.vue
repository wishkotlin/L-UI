<template>
    <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
            :duration="{ enter: 500, leave: 800 }"
    >
        <div class="sider" v-if="visiable">
            <slot></slot>
            <button @click="hide">close</button>
        </div>
    </transition>
</template>

<script>
    import Velocity from 'velocity-animate'

    export default {
        name: "g-sider",
        data() {
            return {
                visiable: true
            }
        },
        methods: {
            hide() {
                this.visiable = false
            },
            beforeEnter: function (el) {
                el.style.opacity = 0
                el.style.transformOrigin = 'left'
            },
            enter: function (el, done) {
                Velocity(el, {opacity: 1, fontSize: '1.4em'}, {duration: 300})
                Velocity(el, {fontSize: '1em'}, {complete: done})
            },
            leave: function (el, done) {
                // Velocity(el, {translateX: '15px', rotateZ: '50deg'}, {duration: 600})
                // Velocity(el, {rotateZ: '100deg'}, {loop: 2})
                // Velocity(el, {
                //     rotateZ: '45deg',
                //     translateY: '30px',
                //     translateX: '30px',
                //     opacity: 0
                // }, {complete: done})
                // console.log(el.clientWidth)
                Velocity(el, {marginLeft: `-${el.clientWidth}px`,}, {duration: 300}, {complete: done})
            }
            // enter: function (el, done) {
            //     el.marginLeft = '-200px'
            //     done()
            // },
            // leave: function (el, done) {
            //     el.transition = 'all .5s';
            //     el.marginLeft = '-200px';
            //     done()
            // },
            // beforeEnter: function (el) {
            //     // el.style.opacity = 0
            //     // el.style.transformOrigin = 'left'
            // },
        }
    }
</script>

<style lang="scss" scoped>
    .sider {
        position: relative;

        > button {
            position: absolute;
            top: 0;
            right: 0;
        }

    }

    .fade-enter-active, .fade-leave-active {
        /*transition: opacity .5s;*/
        /*transition: transform .5s;*/
        /*transition: all .5s;*/
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        /*opacity: 0;*/
        /*transform: translateX(-100%);*/
        /*margin-left: -100%;*/
    }
</style>
