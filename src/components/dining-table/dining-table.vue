<template>
    <div class="dining-table" @click.stop="hideFlag(false)">

        <tab-control :active="mode" title="餐桌信息" :list="tabList" @select="selectItem"></tab-control>

        <div class="dining-list">
            <ul>
                <li v-for="(item,index) in filterList" :class="item.status === 0 ? '' : 'active'" >
                    <div v-show="item.status === 0" @click.stop="showInput(item.id)">空桌</div>
                    <div v-show="item.status !== 0" @click.stop="showAlert(item)">
                        <div><span class="pull-left">{{item.name}}</span> <span class="pull-right">{{item.num}}人</span></div>
                        <div>金额：￥{{getItemMoney(item.infos)}}</div>
                    </div>
                </li>
            </ul>
        </div>

        <alert
                :showFlag="showFlag"
                :infos="infos"
                :id="currentID"
                :date="currentDate"
                :orderID="currentOrderID"
                @point="point"
                @settle="settle"
                @hide="hideFlag">

        </alert>

        <div @click.stop>

            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose" >

                <el-input placeholder="请输入就餐人数" type="number" v-model.number="humanNum">
                    <template slot="append">人</template>
                </el-input>
                <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="affirm">确 定</el-button>
            </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
  import Alert from '@/base/alert/alert'
  import tabControl from '@/base/tab-control/tab-control'
  import {mapMutations,mapGetters} from 'vuex'
  import {setTitle} from '@/common/js/mixins'



  export default {
    name: 'dining-table',
    mixins: [setTitle],
    data(){
      return {
        tabList: [
          {mode: 0, name: '全部'},
          {mode: 1, name: '空桌'},
          {mode: 2, name: '就餐'},
          {mode: 3, name: '预定'}
        ],
        mode: 0,
        showFlag: false,
        dialogVisible: false,
        humanNum: '',
        infos:[],
        currentID: 0,
        currentDate: 0,
        currentOrderID: 0
      }
    },
    computed:{
      filterList(){
        if(this.mode === 0){
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
    methods: {
      ...mapMutations({
        set_currentTable: 'SET_CURRENTTABLE'
      }),

      selectItem(mode){
        this.mode = mode;
      },
      showAlert(item){
        this.showFlag = true;
        this.infos = item.infos || []
        this.currentTable = item
        this.currentID = item.id
        this.currentDate = item.date
        this.currentOrderID = 0
      },
      hideFlag(bool){
        this.showFlag = bool;
        this.dialogVisible = bool
      },
      showInput(id){
        this.dialogVisible = true
        this.table = id
        this.humanNum = 0

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      cancel(){
        this.dialogVisible = false
      },
      affirm(){
        if(this.humanNum){

        }
        this.dialogVisible = false

        this.$router.push({
          path: `/menu/${this.table}/${this.humanNum}`
        })
      },
      getItemMoney(infos){

        let num = 0;
        infos.forEach((item) => {
          num += item.money * item.num
        })
        return num
      },
      point(){
        this.hideFlag(false)
        let temp = this.infos.slice()
        this.set_currentTable(this.currentID)

        this.$router.push({
          path:`/menu/${this.currentTable.id}/${this.currentTable.num}`
        })
      },
      settle(){

        this.set_currentTable(this.currentID)
        if(this.currentTable){
          this.$router.push({
            path:`/settle/${this.currentTable.id}/${this.currentTable.num}`
          })
        }
        this.hideFlag(false)
      }
    },
    components: {
      Alert,
      tabControl
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
                    line-height 70px
                    background white
                    color $color-text-default
                    border-radius 4px
                    font-size 14px
                    box-shadow 0 0 4px #ccc
                >.active
                    background #2e81ef
                    color white
                    line-height 35px
</style>