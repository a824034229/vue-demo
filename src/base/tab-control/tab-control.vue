<template>
    <div class="title">
        <h2>
            {{title}}
        </h2>
        <ul class="filter-tab">
            <li v-for="(item, index) in list" :class="getActiveTab(item.mode)" @click.stop="selectItem(item.mode)">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
      name: 'tab-control',
      props: {
        title: {
          type: String,
          default: ''
        },
        list: {
          type: Array,
          default: null
        },
        active: {
          type: Number,
          default : 0
        }
      },
      computed: {
      },
      methods: {
        selectItem(mode){
          this.$emit('select',mode)
        },

        getActiveTab(mode){
          return this.active === mode ? 'active' : '';
        },
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable.styl"
    h2
        color $color-title-default
        font-weight 500
    .title
        position relative
        > h2
            display inline-block
            color #3e3e3e
        > .filter-tab
            position absolute
            right 0
            top 10px
            width 400px
            list-style disc inside
            text-align right
            > li
                display inline-block
                line-height 24px
                position relative
                margin 0 10px
                padding 0 4px
                color $color-text-default
            > li:hover
                cursor pointer
                color #7ec8ef
            > .active
                color #2e81ef
                > span
                    color #2e81ef
    .filter-tab > li:before
        content '·'
        width 15px
        font-weight bold
        color white
        font-size 24px
    .filter-tab > .active:before
        color #2e81ef
</style>