<template>
    <div class="menu-list">
        <div class="left">
            <tab-control title="菜品" :active="mode" :list="tabList" @select="selectTab">

            </tab-control>
            <div class="greens-list">
                <ul>
                    <li v-for="(item, index) in filterGreens" @click.stop="selectGreen(item,index)" v-show="index <= currentPageSize * currentPage && index > (currentPage - 1) * currentPageSize ">
                        <img src="../../common/images/greens.png" alt="">
                        <div>
                            {{item.name}}
                             <span :class="item.discounts.type !== 0 ? 'line-center' : ''">
                                 {{item.money}}元
                             </span>
                        </div>
                        <div  class="discounts">
                            <span v-if="item.discounts.type !== 0" >优惠价{{getCurrentGreenMoney(item)}}元</span>
                            <span v-else> &emsp; &ensp; <i></i> </span>
                        </div>
                    </li>
                </ul>

                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="currentPageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="this.filterGreens.length">
                    </el-pagination>
                </div>

            </div>
        </div>

        <div class="right">
            <right-order
                    :infos="infos"
                    :id="currentOrder.id"
                    :num="num"
                    @add="addNums"
                    @subtract="subtractNum"
                    @settle="settle"
                    @place="place">

            </right-order>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
  import tabControl from '@/base/tab-control/tab-control'
  import rightOrder from '@/components/right-order/right-order'
  import {mapMutations,mapGetters,mapActions} from 'vuex'
  import {setTitle} from '@/common/js/mixins'



  export default {
    mixins: [setTitle],
    data(){
      return {
        DishesList:[],
        tabList: [
          {mode: 0, name: '全部'},
          {mode: 1, name: '热菜'},
          {mode: 2, name: '凉菜'},
          {mode: 3, name: '汤羹'}
        ],
        infos: [],
        mode: 0,
        id: '',
        num: 0,
        haveDiscount: 0,
        currentPage: 1,
        currentPageSize: 10
      }
    },
    computed:{
      filterGreens(){
        let temp = this.greenList ? JSON.parse(JSON.stringify(this.greenList)) : []
        if(this.mode === 0){
          return temp
        }
        return temp.filter((item,index) => {
           return item.kind === this.mode
        })
      },
      ...mapGetters(['currentOrder','greenList','maxDiscounts','discounts'])
    },
    created(){
      this.setTitle('菜单')
      this.infos = this.currentOrder.infos ? JSON.parse(JSON.stringify(this.currentOrder.infos)) : []
      this.num = this.$route.params.num
    },
    methods: {
      ...mapActions(['updateDiningList']),
      selectTab(mode){      /* 切换显示的列表 */
        this.mode = mode
      },
      selectGreen(item){    /* 选中菜单 */
        let index = -1;
        index = this.infos.findIndex((info,index) => {
          return info.name === item.name && info.money === item.money
        })
        if(index >= 0){
          let module = this.infos[index];
          module.num += 1
          this.infos[index] = module
          this.infos.splice(index,0,module)
          this.infos.splice(index,1)
        }else{
          let temp = JSON.parse(JSON.stringify(item))
          temp.num = 1
          this.infos.push(temp)
        }
      },
      addNums(item, index){         /* 添加菜品数量 */
        let module = this.infos.slice(index,index+1)
        module[0].num += 1
        this.infos[index] = module[0]
      },
      subtractNum(item, index){     /*  减少菜品数量 */
        let module = this.infos[index]
        module.num -= 1
        if(module.num === 0){
          this.infos.splice(index,1)
          return
        }
        this.infos[index] = module

      },
      place(){       /* 下单 */
        let currentOrder = JSON.parse(JSON.stringify(this.currentOrder))
        currentOrder.infos = this.infos.slice(0)
        if(currentOrder.infos.length === 0){

        }
        currentOrder.status = 1
        currentOrder.num = this.num
        let tmp = JSON.parse(JSON.stringify(currentOrder))
        this.updateDiningList(tmp)
        this.openFullScreen()
        setTimeout(() => {
          this.loading.close()
          this.loading = ''
        },1000)
      },
      settle(){  /* 结账 */
        let currentOrder = JSON.parse(JSON.stringify(this.currentOrder))
        currentOrder.infos = this.infos.slice(0)
        currentOrder.status = 1
        currentOrder.num = this.num
        let tmp = JSON.parse(JSON.stringify(currentOrder))

        this.updateDiningList(tmp)

        this.$router.push({
          path:`/settle/${this.currentOrder.id}/${this.num}`
        })
      },
      openFullScreen(text = '正在下单') {    /* loading 状态 */
        this.loading = this.$loading({
          lock: true,
          text,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      },
      $playAlert(text,title){
        let option = {
          text: '您还未选择菜品!',
          title: '提示',
          confirmButtonText: '确定',
        }
        this.$alert(option.text, option.title,option);
      },
      getCurrentGreenMoney(item){       /* 获取当前菜品的实际金额 */
        let num = item.money ;
        let discounts = 0
        if(this.haveDiscount >= this.maxDiscounts){

        }
        if(item.discounts.type === 1){
          num *= item.discounts.num
        }else if(item.discounts.type === 2){
          num -= item.discounts.num
        }
//        this.maxDiscounts
//        this.discounts
        return num
      },
      handleSizeChange(val){
        this.currentPageSize = val
      },
      handleCurrentChange(val){
        this.currentPage = val
      },

    },
    components:{
      tabControl,
      rightOrder
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .menu-list
        padding-left 80px
        box-sizing border-box
        width 100%
        overflow hidden
        padding-bottom 20px
        >.left
            width 70%
            float left
            clear()
            >.greens-list
                width 100%
                >ul
                    overflow hidden
                    >li
                        float left
                        width 25%
                        box-sizing border-box
                        padding 4px
                        text-align center
                        .line-center
                            text-decoration: line-through
                        .discounts
                            color #ff792d
                            font-size 14px
                            height 24px
                            line-height 24px
                        img
                            width 100%
                            box-shadow 0 0 4px #ccc
                            border-radius 10px
        >.right
            width 30%
            float left
</style>