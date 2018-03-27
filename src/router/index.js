import Vue from 'vue'
import Router from 'vue-router'
const DiningTable = (resolve) => {   /* 餐桌信息 该写法为 Webpack 推荐的 懒加载写法  */
  import('@/components/dining-table/dining-table').then((module) => {
    resolve(module)
  })
}

const MenuList = (resolve) => { /* 菜单  */
  import('@/components/menu-list/menu-list').then((module) => {
    resolve(module)
  })
}

const settleAccounts = (resolve) => {  /* 结账页面 */
  import('@/components/settle-accounts/settle-accounts').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)
let routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/dining'
  },
  {
    path: '/dining',
    name: 'dining',
    component: DiningTable
  },
  {
    path: '/menu/:id/:num',
    name: 'menu',
    component: MenuList,
  },
  {
    path: '/settle/:id/:num',
    name: 'settle',
    component: settleAccounts
  },
]

export default new Router({
  routes
})
