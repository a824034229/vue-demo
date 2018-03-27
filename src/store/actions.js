import * as types from './mutation-type'

function findIndex(arr,item){
  return arr.findIndex((i) => {
    return i.id === item.id
  })
}
export const updateDiningList = function({commit, state},diningItem){
  let index = findIndex(state.diningList,diningItem)
  let temp = JSON.parse(JSON.stringify(state.diningList))
  temp.splice(index,0, diningItem)
  window.temp1 = JSON.parse(JSON.stringify(temp))
  temp.splice(index + 1, 1)
  window.temp2 = JSON.parse(JSON.stringify(temp))

  commit(types.SET_DININGLIST,temp)
}