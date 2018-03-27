<template>
    <transition name="fade">
        <div class="qr-code" v-show="showFlag" @click.stop="hide">
            <div class="qr-code-box" @click.stop>
                <template v-if="imgurl">
                    <img :src="imgurl" alt="">
                </template>

                <template v-else>
                    <img src="../../common/images/QRCode.jpg" alt="">
                </template>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
      name: 'QR-Code',
      props: {
        imgurl: {
          type: String,
          default: ''
        },
        showFlag: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        hide(){
          this.$emit('hide')
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .fade-enter-active, .fade-leave-active,.scale-enter-active,.scale-leave-active
        transition all .3s

    .fade-enter,.fade-leave-to
        opacity 0

    .qr-code
        position fixed
        width 100vw
        height 100vh
        z-index 997
        top 0
        left 0 
        background-color rgba(0,0,0,0.4)
        display flex
        align-items center
        text-align center
        .qr-code-box
            width 400px
            height 400px
            margin 0 auto
            img
                width 100%
</style>