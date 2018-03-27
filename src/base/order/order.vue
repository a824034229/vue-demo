<template>
    <div class="order">
        <div class="title">
            <div>
                桌号： {{id}}
                人数： {{num}}
            </div>
            <div>
                单号:
            </div>
            <div>
                开台时间
                {{info.date}}
            </div>
        </div>

        <ul>
            <li>
                <div class="cls">品名</div>
                <div class="num">数量</div>
                <div class="money">金额</div>
            </li>

            <li v-for="(item, index) in list" :key="index">
                <div class="cls">{{index + 1}} {{item.name}}</div>
                <div class="num">
                    <span v-if="showFlag"
                          class="el-icon el-icon-circle-plus-outline"
                          @click.stop="adds(item,index)">

                    </span>
                    {{item.num}}
                    <span v-if="showFlag"
                          class="el-icon el-icon-remove-outline"
                          @click.stop="subNum(item,index)">

                    </span>
                </div>
                <div class="money">{{item.num * item.money}} 元</div>
            </li>
        </ul>

        <div class="clearing" v-show="showFlag">
            <p>菜品金额：￥{{totalAmount}} 元</p>
            <p>应付金额：￥{{amountPayable}} 元</p>
        </div>

        <div class="btn-group" :style="{bottom: bottom + 'px'}" v-if="showFlag">
            <button type="button" class="btn-left" @click.stop="placeOrder"> 下单</button>
            <button type="button" class="btn-right" @click.stop="settle"> 结账</button>
        </div>

    </div>
</template>

<script>
  import formatDate from '@/common/js/formatDate'

  export default {
    props: {
      list: {
        type: Array,
        default: null
      },
      info: {
        type: Object,
        default(){
          return {
            date: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
          }
        }
      },
      discounts: {
        type: Number,
        default: 0
      },
      bottom: {
        type: Number,
        default: 0
      },
      showFlag: {
        type: Boolean,
        default: true
      },
      id: {
        type: [String,Number],
        default: ''
      },
      num: {
        type: [Number, String],
        default: 0
      }
    },
    data(){
      return {}
    },
    computed: {
      totalAmount(){
        let num = 0

        /*this.list.forEach((item) => {
          num += item.money * item.num
        })*/
        this.list.map((item) => {
          num += item.money * item.num
        })

        return num
      },
      amountPayable(){
        let tot = this.totalAmount - this.discounts
        return tot > 0 ? tot : 0
      }
    },
    mounted(){
      this.$emit('total',this.totalAmount)
      this.$emit('pay',this.amountPayable)
    },
    methods: {
      adds(item, index){
        this.$emit('add', item, index)
      },
      subNum(item, index){
        this.$emit('subtract', item, index)
      },
      placeOrder(){
        this.$emit('place')
      },
      settle(){
        this.$emit('settle')
      },
      getTotalAmount(){
        return this.totalAmount
      },
      getAmountPayable(){
        return this.amountPayable
      }
    },
    watch: {


    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .order
        background-color white
        border-radius 4px
        padding 8px
        padding-bottom 60px

        > .title
            box-sizing border-box
        > ul > li:first-child
            text-align center
            text-indent 0
        > ul > li
            display flex
            align-items center
            text-align left
            font-size 14px
            text-indent 0.1em
            > .num
                flex 0 0 30%
                text-align center
            > .money
                flex 0 0 30%
                text-align center
            > div
                flex 1 0 40%
            .el-icon:hover
                cursor pointer
        > .clearing p
            text-align right
            line-height 24px
            margin 0
            box-sizing border-box
            padding 0 10px
        > .btn-group
            position absolute
            height 50px
            width 100%
            bottom 0
            left 0
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