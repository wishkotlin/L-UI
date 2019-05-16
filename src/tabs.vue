<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "tabs",
        props: {
            selected: {
                type: String,
                required: true
            },
            direction:{
                type:String,
                default: 'Horizontal',
                validator(value){
                    return ['Horizontal','Vertical'].indexOf(value) >= 0
                }
            }
        },
        created() {
            // this.$emit('update:selected','参数')
        }
    }
</script>

<style scoped>

</style>
