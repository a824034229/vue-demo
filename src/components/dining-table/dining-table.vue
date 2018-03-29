<template>
    <div class="dining-table" @click.stop="hideFlag(false)">

        <tab-control :active="mode" title="餐桌信息" :list="tabList" @select="selectItem"></tab-control>

        <div class="dining-list">
            <ul >
                <li v-for="(item,index) in filterList"
                    :class="item.status === 0 ? '' : 'active'"
                    :data-index="index"
                    @contextmenu.prevent="rightHand($event,item)">

                    <div v-show="item.status === 0" @click.stop="showInput(item)">
                        <p>{{item.name}}</p>
                        <p>空桌 </p>
                    </div>
                    <div v-show="item.status !== 0" @click.stop="showAlert(item)">
                        <div><span class="pull-left">{{item.name}}</span> <span class="pull-right">{{item.num}}人</span></div>
                        <div>金额：￥{{getItemMoney(item.infos)}}</div>
                    </div>
                </li>
            </ul>
        </div>

        <alert
                :showFlag="showFlag"
                :infos="currentTable.infos"
                :id="currentTable.id"
                :date="currentTable.date"
                :orderID="'12312312'"
                @point="point"
                @settle="settle"
                @hide="hideFlag">

        </alert>

        <div @click.stop>

            <el-dialog
                    title="订桌 (请输入就餐人数)"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose" >

                <el-input
                        placeholder="请输入就餐人数"
                        type="number"
                        v-model.number="humanNum"
                        :min="min"
                        :max="max">

                    <el-button slot="prepend" type="success" round @click.stop="addMan">加1</el-button>
                    <el-button slot="prepend" type="success" round @click.stop="subMan ">减1</el-button>

                    <template slot="append">人</template>
                </el-input>

                <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="affirm">确 定</el-button>
            </span>
            </el-dialog>
        </div>

        <right-hand
                :showFlag="showRightHand"
                :left="clientLeft"
                :list="rightMenu"
                @hide="hideFlag(false)"
                :top="clientTop">

        </right-hand>

    </div>
</template>

<script>
  import Alert from '@/base/alert/alert'
  import tabControl from '@/base/tab-control/tab-control'
  import {mapMutations,mapGetters} from 'vuex'
  import {setTitle} from '@/common/js/mixins'
  import rightHand from '@/base/right-hand/right-hand'

  export default {
    name: 'dining-table',
    mixins: [setTitle],
    data(){
      return {
        tabList: [                /* 选项列表 */
          {mode: 1, name: '全部'},
          {mode: 0, name: '空桌'},
          {mode: 2, name: '就餐'},
          {mode: 3, name: '预定'}
        ],
        mode: 1,                  /* 显示列表模式 */
        showFlag: false,        /* 是否显示弹窗 */
        dialogVisible: false,   /* 是否显示 Element alert弹窗 */
        humanNum: 4,             /* 就餐人数 */
        currentTable: {},       /* 当前桌 */
        max: 8,                  /* 每桌最大就餐人数 */
        min: 1,                  /* 每桌最小就餐人数 */
        showRightHand: false,   /* 是否显示右键列表 */
        clientLeft: 0,          /* 右键列表距离屏幕 左边的距离 */
        clientTop: 0,            /* 右键列表距离屏幕顶部的距离 */
        rightMenu: [        /* 右键菜单栏显示的列表 */
          {name: '下单'},
          {name: '结账'},
        ],
      }
    },
    computed:{
      filterList(){
        if(this.mode === 1){
          return this.diningList
        }else{
          return this.diningList.filter((item,index) => {
              return this.mode === item.status
          })
        }
      },
      ...mapGetters(['diningList'])
    },
    created(){
      this.setTitle('餐桌信息')
    },
    mounted(){
      let self = this
      window.addEventListener('click', self.hideFlag)
    },
    destoryed(){
      let self = this
      window.removeEventListener('click',self.hideFlag)
    },
    methods: {
      ...mapMutations({
        set_currentTable: 'SET_CURRENTTABLE'
      }),

      selectItem(mode){  /*  更改显示的类型 */
        this.mode = mode;
      },
      showAlert(item){          /* 显示弹窗 */
        this.showFlag = true;
        this.set_currentTable(item.id)
        this.currentTable = item
      },
      hideFlag(bool){
        bool = !!bool
        this.showFlag = false;
        this.dialogVisible = false
        this.showRightHand = false
      },    /* 隐藏弹窗 */
      showInput(item){
        this.dialogVisible = true
        this.set_currentTable(item.id)
        this.currentTable = item
      },      /* 显示输入人数 input */
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      },  /* 确认关闭 */
      cancel(){
        let status = this.examineNum()
        if(!status){
          return
        }
        this.dialogVisible = false
      },            /* 取消 input */
      affirm(){                  /* 确定 */
        let status = this.examineNum()
        if(!status){
          return
        }

        this.dialogVisible = false
        this.$router.push({
          path: `/menu/${this.currentTable.id}/${this.humanNum}`
        })
      },            /* 确认 input */
      getItemMoney(infos){      /* 计算该桌消费金额 */
        let num = 0;
        let temp;
        infos.map((item) => {
          temp = item.money * item.num
          if(item.discounts.type === 1){
            temp *= item.discounts.num
          }else if(item.discounts.type === 2){
            temp -= item.discounts.num * item.num
          }
          num += temp
        })
        return parseFloat(num).toFixed(2)
      },
      point(){                  /* 点菜 */
        this.hideFlag(false)
        let temp = this.currentTable.infos.slice()
        this.$router.push({
          path:`/menu/${this.currentTable.id}/${this.currentTable.num}`
        })
      },
      settle(){                 /* 结账 */

        if(this.currentTable){
          this.$router.push({
            path:`/settle/${this.currentTable.id}/${this.currentTable.num}`
          })
        }
        this.hideFlag(false)
      },
      examineNum(){         /* 验证人数 */
        let status = true
        if(this.humanNum > this.max){
          this.humanNum = this.max
          status = false
        }else if(this.humanNum < this.min){
          this.humanNum = this.min
          status = false
        }
        if(!status){
          this.$message('人数已更改');
        }
        return status
      },
      addMan(){         /* 加一人 */
        if(this.humanNum < this.max){
          this.humanNum += 1
        }
      },
      subMan(){         /* 减一人 */
        if(this.humanNum > this.min){
          this.humanNum -= 1
        }
      },
      rightHand(e,item){
        let path = e.path;
        let li = false;
        for(let i=0; i<path.length; i++){
          if(path[i].tagName === 'LI' && path[i].getAttribute('data-index') != null ){
            li = path[i]
            break
          }
        }
        if(li){
          this.clientLeft = e.clientX
          this.clientTop = e.clientY
          for(let i = 0; i < this.rightMenu.length; i++){
            this.rightMenu[i]['func'] = function(){
               if(i === 0){
                 this.showInput(item)
               }else{
                 this.showAlert(item)
               }
               this.showRightHand = false
            }.bind(this)
          }
          this.showRightHand = true
        }else{
          this.showRightHand = false
        }

        return false
      }
    },
    components: {
      Alert,
      tabControl,
      rightHand
    }
  }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable.styl"

    .dining-table
        position relative
        padding-left 80px
        overflow hidden
        >.dining-list
            >ul
                position relative
                overflow hidden
                >li
                    float left
                    width 13%
                    height 70px
                    margin-right 10px
                    margin-bottom 10px
                    text-align center
                    background white
                    color $color-text-default
                    border-radius 4px
                    font-size 14px
                    box-shadow 0 0 4px #ccc
                    p
                        line-height 35px
                        margin 0
                >.active
                    background #2e81ef
                    color white
                    line-height 35px
</style>