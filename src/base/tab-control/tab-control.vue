<template>
    <div class="title">
        <h2>
            {{title}}
        </h2>
        <ul class="filter-tab">
            <li v-for="(item, index) in list" :class="getActiveTab(item.mode)" @click.stop="selectItem(item.mode)">
                <span>·</span>
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
            width 300px
            list-style disc inside
            text-align right
            > li
                display inline-block
                line-height 24px
                position relative
                margin 0 10px
                padding 0 4px
                color $color-text-default
                > span
                    position absolute
                    display inline-block
                    left -15px
                    top 0
                    line-height 18px
                    font-size 50px
                    color white
            > li:hover
                cursor pointer
                color #7ec8ef
            > .active
                color #2e81ef
                > span
                    color #2e81ef
</style>