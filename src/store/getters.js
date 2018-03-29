export const userInfo = state => state.userInfo
/* 这种写法是 ECMAScript2015（又称 ES6 ）中新增的函数写法   */

export const orderInfo = state => state.orderInfo

export const currentOrder = state => {
  let index = state.diningList.findIndex((item) => {
    return item.id === state.currentTable
  })
  if(index < 0){
    return {}
  }
  return state.diningList.slice(index,index + 1)[0]
}

export const diningList = state => state.diningList

export const currentTable = state => state.currentTable  /* 当前桌号 */

export const greenList = state => state.greenList

export const maxDiscounts = state => state.maxDiscounts

export const discounts = state => state.discounts
