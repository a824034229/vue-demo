<template>
    <nav id="left-nav">
        <ul>
            <li class="user-logo">
                <img src="../../common/images/user.png" alt="">
            </li>
            <router-link :class="getActiveClass(item.link)" tag="li" :to="item.link" v-for="(item,index) in menu" :key="index" :title="item.link">
                <div>
                    <img src='../../common/images/menu.png' alt="">
                </div>
                {{item.name}}
            </router-link>
        </ul>
    </nav>
</template>

<script>
  export default {
    props: {
      menu: {
        type: Array,
        default(){
          return [
            {name: '菜单',link: '/menu/0/0',iconUrl:'../../common/images/menu.png'},
            {name: '餐桌信息',link: '/dining',iconUrl:'../../common/images/pot.png'},
            {name: '结账',link: '/settle/0/0',iconUrl:'../../common/images/menu.png'},
          ]
        }
      }
    },
    methods: {
      getActiveClass(link){
        return link === this.$route.path ? 'active' : ''
      }
    }
  }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable.styl"

    #left-nav
        position fixed
        z-index 98
        left 0
        top 0
        height 100vh
        width 64px
        background-color #38425d
        > ul
            width 100%
            >.user-logo img
                width 80%
                margin 0 auto
            > li
                width 100%
                text-align center
                font-size 12px
                padding 6px 0
                color white
            > li:hover
                cursor pointer
                background #5c6b95
            >.active
                background-color #152038

</style>