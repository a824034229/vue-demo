<template>
    <div class="calculator">
        <div class="show">
            <span v-if="showFlag">
                <i v-if="result">
                    {{result}}
                </i>
                <i v-else>
                    0
                </i>
            </span>
            <span v-else>
                <i v-if="process">
                    {{process}}
                </i>
                <i v-else>
                    0
                </i>
            </span>
        </div>

        <div class="item-box">
            <div>
                <div class="item" @click.stop="openMoney">开钱箱</div>
                <div class="item" @click.stop="clear">清空</div>
                <div class="item" @click.stop="back"><span class="el-icon-error"></span></div>
                <div class="item" @click.stop="selectItem('/')">/</div>
            </div>
            <div>
                <div class="item" @click.stop="selectItem('7')">7</div>
                <div class="item" @click.stop="selectItem('8')">8</div>
                <div class="item" @click.stop="selectItem('9')">9</div>
                <div class="item" @click.stop="selectItem('*')">*</div>
            </div>
            <div>
                <div class="item" @click.stop="selectItem('4')">4</div>
                <div class="item" @click.stop="selectItem('5')">5</div>
                <div class="item" @click.stop="selectItem('6')">6</div>
                <div class="item" @click.stop="selectItem('-')">-</div>
            </div>
            <div>
                <div class="item" @click.stop="selectItem('1')">1</div>
                <div class="item" @click.stop="selectItem('2')">2</div>
                <div class="item" @click.stop="selectItem('3')">3</div>
                <div class="item" @click.stop="selectItem('+')">+</div>
            </div>
            <div>
                <div class="item" @click.stop="selectItem('0')">0</div>
                <div class="item" @click.stop="selectItem('.')">.</div>
                <div class="item" style="flex: 2 0" @click.stop="row">=</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'calculator',
      data(){
        return {
          result: 0,
          calculate: '',
          process: '',
          showFlag: false ,

        }
      },
      methods: {
        selectItem(item){

          this.showFlag = false
          this.result = 0
          if(item === '.'){
            if (this.process.indexOf('.') >= 0 ){
              return
            }
          }
          let filter = ['*','+','-','/']        /* 过滤操作符，以免多次输入 */
          let index = filter.findIndex((i) => {
            return i === this.process[this.process.length - 1]
          })

          let idx = filter.findIndex((j) => {
            return j === item
          })

          if(index >= 0){
            if(idx >= 0){
              let tmp = this.process.split('')
              tmp.pop()
              tmp.push(item)
              tmp = tmp.join('')
              this.process = tmp
              return false
            }
          }
          this.process += item

        },
        row(){
          try{
            this.result = eval(this.process)
          }catch(error){
            this.result = 0
          }
          this.showFlag = true
          this.process = this.result
        },
        clear(){
          this.process = ''
          this.result = 0
        },
        openMoney(){

        },
        back(){
          this.showFlag = false
          let process = String(this.process)
          let ret = process.substr(0,process.length - 1)
          this.process = ret
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .calculator
        width 100%
        position relative
        .show
            width 100%
            background white
            line-height 44px
            margin-bottom 10px
            text-align right
            padding 0 10px
            box-sizing border-box
        >.item-box

            >div
                display flex
                margin-bottom 10px
                >div
                    flex 1 0
                    box-sizing border-box
                    background white
                    border-radius 4px
                    text-align center
                    line-height 44px
                    float left
                    margin-right 10px
                >div:last-child
                    margin-right 0
</style>