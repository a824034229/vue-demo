export const userInfo = state => state.userInfo

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