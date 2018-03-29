<template>
    <transition name="slide">
        <div class="right-hand-box" @click.stop="hide" @contextmenu="hide"  v-show="showFlag">
            <div class="right-hand" :style="{left:left + 'px', top:top + 'px'}">
                <ul>
                    <li v-for="(item, index) in list" @click.stop="item.func($event)" @contextmenu="item.func($event); return false">
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'right-hand',
    props: {
      left: {
        type: Number,
        default: 0
      },
      top: {
        type: Number,
        default: 0
      },
      showFlag: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default(){
          return [
            {name: '选项1', func(e){console.log(e,1);}},
            {name: '选项2', func(e){console.log(e,2);}},
            {name: '选项2', func(e){console.log(e,3);}},
          ]
        }
      }
    },
    methods: {
      hide(){
        console.log('hide');
        this.$emit('hide')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable.styl"

    .slide-enter-active, .slide-leave-active
        transition all .2s

    .slide-enter, .slide-leave-to
        opacity 0
        transform scale(1.1,1.1)
    .scale-enter, .scale-leave-to
        transform scale(0) !important

    .right-hand-box
        position fixed
        z-index 999
        left 0
        top 0
        width 100vw
        height 100vh
        background rgba(0,0,0,0)
    .right-hand
        position fixed
        width 200px
        > ul
            position relative
            background white
            border-radius 4px
            box-shadow 0 0 4px
            > li
                line-height 28px
                text-indent 1em
                color $color-text-default
            > li:hover
                background #eeeeee
            > li:first-child
                border-top-left-radius 4px
                border-top-right-radius 4px
            > li:last-child
                border-bottom-left-radius 4px
                border-bottom-right-radius 4px

</style>