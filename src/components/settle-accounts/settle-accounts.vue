<template>
    <div class="settle-wrapper">
        <div class="settle">
            <div class="content">
                <h2>
                    结账
                </h2>
                <div class="content-box">
                    <div class="left">
                        <order
                                :list="currentOrder.infos"
                                :id="id"
                                :num="num"
                                :showFlag="false"
                                @total="getTotal"
                                @pay="getPay"
                                ref="order"
                        ></order>
                    </div>
                    <div class="center">
                        <div class="center-box">
                            <div>
                                <div class="left">
                                    应付金额
                                </div>
                                <div class="right">
                                    ￥{{total}}
                                </div>
                            </div>
                            <div>
                                <div class="left">
                                    实付金额
                                </div>
                                <div class="right">
                                    ￥{{pay}}
                                </div>
                            </div>
                            <div>
                                <div class="left">
                                    优惠
                                </div>
                                <div class="right">
                                    ￥{{change}}
                                </div>
                            </div>
                        </div>
                        <calculator></calculator>
                    </div>
                    <div class="right">
                        <div>
                            <div class="item">挂单</div>
                            <div class="item">免单</div>
                            <div class="item">作废</div>
                        </div>

                        <div>
                            <div class="item">发票</div>
                            <div class="item">备注</div>
                        </div>

                        <div>
                            <div class="item bg-green" @click.stop="showQR=true ">微信支付</div>
                            <div class="item bg-blue" @click.stop="showQR=true ">支付宝支付</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <qr-code :showFlag="showQR" @hide="hideQR">

        </qr-code>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import calculator from '@/base/calculator/calculator'
  import Order from '@/base/order/order'
  import QrCode from '@/base/qr-code/qr-code'
  import {setTitle} from '@/common/js/mixins'

  export default {
    mixins: [setTitle],
    data(){
      return {
        id: 0,
        num: 0,
        total: 0,
        pay: 0,
        showQR: false
      }
    },
    created(){
      this.id = this.currentOrder.id
      this.num = this.currentOrder.num
      this.setTitle('结账')
      if (this.id === 0 && this.num === 0) {
        this.$router.push({
          path: '/dining'
        })
      }
    },
    computed: {
      ...mapGetters(['orderInfo', 'currentOrder']),
      change(){
        return parseFloat(this.total - this.pay).toFixed(2)
      }
    },
    methods: {
      getTotal(num){
        this.total = num
      },
      getPay(num){
        this.pay = num
      },
      hideQR(){
        this.showQR = false
      }
    },
    components: {
      calculator,
      Order,
      QrCode
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable.styl"
    h2
        font-weight 500
        color $color-title-default

    .settle-wrapper
        position relative
        width 100%
        height 100vh
        min-height 600px
        box-sizing border-box
        overflow hidden
        > .settle
            padding-left 80px
            width 70%
            height 80vh
            min-height 500px
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            > .content
                height 80vh
                width 70vw
                > .content-box
                    display flex
                    align-items center
                    > div
                        overflow hidden auto
                        flex 1 0 auto
                        height 80vh
                        box-sizing border-box
                        margin-right 10px
                        border-radius 4px
                    > div:last-child
                        margin-right 0
                    > .left
                        position relative
                        background white
                    > .center
                        flex 1 0 auto
                        .center-box
                            margin-bottom 20px
                            border-radius 4px
                            box-sizing border-box
                            border 6px solid white
                            > div
                                overflow hidden
                                background white
                                line-height 32px
                            .left, .right
                                width 50%
                                float left
                                text-align right
                            .left
                                text-align left
                            .right
                                color #ee3e41
                    > .right
                        flex 0 0 80px
                        margin-left 10px
                        > div
                            margin-bottom 25px
                            > .item
                                background white
                                line-height 40px
                                text-align center
                                font-size 14px
                                margin-bottom 10px
                                border-radius 2px
                            > .bg-green
                                background #05af10
                                color white
                            > .bg-blue
                                background #00aaef
                                color white

</style>