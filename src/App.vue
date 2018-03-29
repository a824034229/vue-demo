<template>
    <div id="app" @click.stop="clickScreen" oncontextmenu="return false" >
        <left-nav ></left-nav>
        <router-view/>
    </div>
</template>

<script>
  import LeftNav from '@/components/left-nav/left-nav.vue'

  export default {
    name: 'App',
    data(){
      return {

      }
    },
    methods:{
      clickScreen(){

      },
      rightHand(e){
        console.log(e,'e');
      }
    },
    components:{
      LeftNav
    }

  }
</script>

<style lang="stylus">
    @import "./common/stylus/variable.styl"
    @import "./common/stylus/mixin.styl"
    @import "./common/stylus/default.styl"

    #app
        background-color $background-color-default
        width 100%
        min-height 100vh
        overflow hidden
</style>
