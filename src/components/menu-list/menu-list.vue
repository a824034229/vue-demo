<template>
    <div class="menu-list">
        <div class="left">
            <tab-control title="菜品" :active="mode" :list="tabList" @select="selectTab">

            </tab-control>
            <div class="greens-list">
                <ul>
                    <li v-for="(item, index) in filterGreens" @click.stop="selectGreen(item,index)">
                        <img src="../../common/images/greens.png" alt="">
                        <div>
                            {{item.name}}
                             <span>
                                 {{item.money}}元
                             </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="right">
            <right-order
                    :infos="infos"
                    :id="id"
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
        greensList: [
          {name: '香煎嫩豆腐', money: 32, kind: 1 },
          {name: '麻辣田鸡', money: 32, kind: 1 },
          {name: '蒜蓉烤茄子', money: 32, kind: 2 },
          {name: '家常麻辣鱼', money: 32, kind: 3 },
        ],
        infos: [],
        mode: 0,
        id: '',
        num: 0
      }
    },
    computed:{
      filterGreens(){
        if(this.mode === 0){
          return this.greensList
        }
        return this.greensList.filter((item,index) => {
           return item.kind === this.mode
        })
      },
      ...mapGetters(['currentOrder'])
    },
    created(){
      this.id = this.currentOrder.id || 0
      this.num = this.currentOrder.num || 0
      this.setTitle('菜单')

      this.infos = JSON.parse(JSON.stringify(this.currentOrder.infos))
      if(this.id === 0 && this.num === 0){
        this.$router.push({
          path: '/dining'
        })
      }
    },
    methods: {
      ...mapActions(['updateDiningList']),
      selectTab(mode){
        this.mode = mode
      },
      selectGreen(item){
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
          this.infos.push({
            name: item.name,
            money: item.money,
            num: 1
          })
        }
      },
      addNums(item, index){
        let module = this.infos.slice(index,index+1)
        module[0].num += 1
        this.infos[index] = module[0]
      },
      subtractNum(item, index){
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
        this.updateDiningList(currentOrder)

      },
      settle(){  /* 结账 */
        this.$router.push({
          path:`/settle/${this.id}/${this.num}`
        })
      }
    },
    components:{
      tabControl,
      rightOrder
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .menu-list
        padding-left 80px
        box-sizing border-box
        width 100%
        >.left
            width 70%
            float left
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
                        img
                            width 100%
                            box-shadow 0 0 4px #ccc
                            border-radius 10px
        >.right
            width 30%
            float left
</style>