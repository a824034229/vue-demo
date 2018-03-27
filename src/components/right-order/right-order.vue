<template>
    <div class="order-wrapper">
        <h2>订单</h2>
        <order :list="list"
               :id="id"
               :num="num"
               @add="addNums"
               @subtract="subtractNum"
               @place="placeOrder"
               @total="total"
               @pay ="pay"
               @settle="settleAccounts">

        </order>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import Order from '@/base/order/order'

  export default {
    name: 'right-order',
    props:{
      infos: {
        type: Array,
        default: null
      },
      discounts: {
        type:Number,
        default: 0
      },
      id: {
        type: String,
        default: ''
      },
      num: {
        type: [Number,String],
        default: 0
      }
    },
    data(){
      return {
        bottom: 0
      }
    },
    computed:{
      list(){
        if(typeof infos !== 'null'){
          return this.infos.slice()
        }
      }
    },
    methods: {
      addNums(item, index){
        this.$emit('add',item,index)
      },
      subtractNum(item, index){
        this.$emit('subtract',item,index)
      },
      placeOrder(){
        this.$emit('place')
      },
      settleAccounts(){
        this.$emit('settle')
      },
      pay(tot){
        this.$emit('pay',tot)
      },
      total(num){
        this.$emit('total',num)
      },
      ...mapMutations({
        set_orderInfo:'SET_ORDERINFO'
      })
    },
    components: {
      Order
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable.styl"
    h2
        font-weight 500
        color $color-title-default
    .order-wrapper
        width 94%
        margin-left 3%
        position relative

</style>