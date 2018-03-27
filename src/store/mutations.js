import * as types from './mutation-type'
export default {
  [types.SET_USERINFO](state,info){
    state.userInfo = info
  },
  [types.SET_ORDERINFO](state,info){
    state.orderInfo = info
  },
  [types.SET_CURRENTTABLE](state,id){
    state.currentTable = id
  },
  [types.SET_DININGLIST](state,info){
    state.diningList = info
  },
  [types.SET_GREENLIST](state,info){
    state.greenList = info
  }
}
