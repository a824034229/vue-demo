<template>
    <transition name="fade">
        <div class="full-screen" @click.stop="hideFlag(false)" v-show="showFlag">
            <transition name="scale">
                <div class="alert" @click.stop ref="alert">
                    <div class="title">
                        <div>桌号：{{id}}</div>
                        <div>单号：{{orderID}}</div>
                        <div>开始时间：{{date}}</div>
                    </div>
                    <div class="context" ref="context">
                        <ul>
                            <li>
                                <div class="cls">品名</div>
                                <div class="num">数量</div>
                                <div class="money">金额</div>
                            </li>
                            <li v-for="(item, index) in infos" :key="index">
                                <div class="cls">
                                    {{index + 1}} {{item.name}}
                                </div>
                                <div class="num">{{item.num}}份</div>
                                <div class="money">{{getCurrentMoney(item)}} 元</div>
                            </li>
                        </ul>

                    </div>


                    <div class="btn-group" :style="{bottom: bottom + 'px'}">
                        <button type="button" class="btn-left" @click.stop="SinglePoint"> 点单</button>
                        <button type="button" class="btn-right" @click.stop="settleAccounts"> 结账</button>
                    </div>

                </div>
            </transition>
        </div>

    </transition>
</template>

<script>
  export default {
    name: 'alert',
    props: {
      infos: {
        type: Array,
        default: null
      },
      showFlag: {
        type: Boolean,
        default: false
      },
      id: {
        type: [String, Number],
        default: 0
      },
      orderID: {
        type: [String, Number],
        default: 0
      },
      date: {
        type: [String, Number],
        default: 0
      }
    },
    data(){
      return {
        bottom: 0
      }
    },
    mounted(){
      if (this.$refs.context) {
        this.$refs.alert.addEventListener('scroll', this.handleScroll)
      }

    },
    destroyed(){
    },
    methods: {
      hideFlag(bool){
        if (typeof bool !== 'boolean') {
          bool = !!bool;
        }
        this.$emit('hide', bool)
      },
      handleScroll(event){
        this.bottom = -event.target.scrollTop
        console.log(this.bottom);
      },
      SinglePoint(){
        this.$emit('point')
      },
      settleAccounts(){
        this.$emit('settle')
      },
      getCurrentMoney(item){
        let num = item.num * item.money
        if (item.discounts.type === 1) {
          num -= num - item.num * item.money * item.discounts.num
        } else if (item.discounts.type === 2) {
          num -= item.num * item.discounts.num
        }
        return num
      }
    }
  }
</script>

<style scoped lang="stylus">
    .fade-enter-active, .fade-leave-active, .scale-enter-active, .scale-leave-active
        transition all .3s

    .fade-enter, .fade-leave-to
        opacity 0
        transform scale(1.1)
    .scale-enter, .scale-leave-to
        transform scale(0) !important

    .full-screen
        position fixed
        z-index 997
        display flex
        top 0
        left 0
        bottom 0
        right 0
        width 100vw
        height 100vh
        background rgba(0, 0, 0, 0.5)
        vertical-align middle
        align-items center
        text-align center

    .alert
        position relative
        display inline-block
        width 40%
        min-width 450px
        max-width 500px
        height 50%
        min-height 400px
        max-height 500px
        background white
        box-sizing border-box
        box-shadow 0 0 4px #ccc
        border-radius 4px
        overflow hidden auto
        margin 0 auto
        padding-bottom 50px
        > .title
            border-bottom 1px solid #ccc
            display flex
            line-height 60px
            font-size 14px
            > div
                flex 1 0 auto
                text-indent 0.5em
        > .context
            position relative
            width 100%
            > .btn-group
                width 100%
                position fixed
                height 50px
                bottom 0
                > button
                    width 50%
                    height 50px
                    text-align center
                    line-height 50px
                    border none
                    float left
                > .btn-left
                    background #5fb870
                > .btn-right
                    background #ee3e41
            > ul
                position relative
                > li
                    display flex
                    align-content center
                    > .cls, > .num, .money
                        flex 1 0 auto
                        text-indent 1em
                        text-align left
                    .cls
                        flex 0 0 40%
                    .num
                        flex 0 0 30%
                    .money
                        flex 0 0 30%
        > .btn-group
            position absolute
            height 50px
            width 100%
            bottom 0

            > button
                width 50%
                height 50px
                text-align center
                line-height 50px
                border none
                float left
                font-size 20px
                color white
            > button:hover
                color $color-text-default
                cursor pointer
            > .btn-left
                background #5fb870
                border-bottom-left-radius 4px
            > .btn-right
                background #ee3e41
                border-bottom-right-radius 4px

</style>