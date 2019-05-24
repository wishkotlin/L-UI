<template>
    <div class="wrapper" :class="{'error': error}">
        <!-- @input="$emit('input',$event.target.value)"    调用事件名称必须为 input           -->
        <!--   :value="value"
        @input="$emit('input',$event.target.value)"
          这两句使组件支持 v-model
          -->
        <input
                @change="$emit('change',$event.target.value)"
                @input="$emit('input',$event.target.value)"
                @focus="$emit('focus',$event.target.value)"
                @blur="$emit('blur',$event.target.value)"
                type="text" :value="value" :disabled="disabled" :readonly="readonly">
        <template v-if="error">
            <icon name="error" class="icon-error"></icon>
            <span class="errorMessage">{{error}}</span>
        </template>

    </div>

</template>

<script>
    import icon from './icon'

    export default {
        components: {
            icon
        },
        props: {
            value: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            error: {
                type: String,
            }
        },
        /**
         * name 是用来调试的 在 vue devtools 中使用
         */
        name: "l-input",
    }
</script>

<style lang="scss" scoped>
    $height: 32px;
    $border-color: #999;
    $boder-color-hover: #666;
    $border-radius: 4px;
    $font-size: 12px;
    $box-shadow-color: rgba(0, 0, 0, 0.5);
    $red: #f1453d;
    .wrapper {font-size: $font-size;display: inline-block;
        display: inline-flex;
        align-items: center;

        > :not(:last-child) {
            margin-right: 0.5em;
        }

        .icon-error {fill: $red; /*vertical-align: center;*/
        }

        .errorMessage {color: $red; /*vertical-align: center;*/
        }

        &.error {
            > input {border-color: $red;

                &:hover {border-color: $red;}

                &:focus {
                    box-shadow: inset 0 1px 3px $red;outline: none;
                }
            }
        }

        > input {height: $height;border: 1px solid $border-color;border-radius: $border-radius;padding: 0 8px;font-size: inherit;

            &:hover {border-color: $boder-color-hover;border-radius: $border-radius;}

            &:focus {
                //box-shadow: inset 0 1px 3px $box-shadow-color;
                box-shadow: inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3);
                border-color: #2188ff;
                outline: none; /*box-shadow: 0 0 0 4px rgb(77, 144, 254);*/
            }

            &[disabled], &[readonly] {border-color: #d1d1d1;color: #d1d1d1;background-color: #fbfbfb;cursor: not-allowed;}
        }

    }
</style>
