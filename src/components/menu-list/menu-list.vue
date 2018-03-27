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
        num: 0
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
      ...mapGetters(['currentOrder','greenList'])
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
          this.infos.push({
            name: item.name,
            money: item.money,
            num: 1
          })
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