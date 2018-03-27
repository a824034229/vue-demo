import formatDate from '@/common/js/formatDate'


let item;
let list = []
for(let i=0; i <= 30; i++){
  item = {
    id: '000' + (i + 1), /* 暂定单号 */
    status:  Math.round(Math.random()*3),
    name: (list.length + 1) +  '号桌',
    num: 0,
    money: (Math.random()* 1000 * Math.random()).toFixed(2),
    date: formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),
    infos: []
  };
  if(item.status !== 0){
    item.infos = [
      {name: '香煎嫩豆腐', money: 32, num: 1, discounts: 1 },
      {name: '麻辣田鸡', money: 32, num: 1, discounts: 1 },
      {name: '蒜蓉烤茄子', money: 32, num: 2, discounts: 1 },
      {name: '家常麻辣鱼', money: 32, num: 3, discounts: 1 }
    ].splice(0,Math.ceil(Math.random() * 3))
    item.num = Math.ceil(Math.random() * 8)
  }
  list.push(item);
}


export default {
  userInfo: {              /* 用户信息 */
    name: '用户名'
  },
  orderInfo: [],          /* 订单信息 */
  currentTable: 'ccc',  /* 当前桌号ID */
  diningList: list,       /* 桌子信息 */
  greenList: [
    {name: '香煎嫩豆腐', money: 32, kind: 1 },
    {name: '麻辣田鸡', money: 32, kind: 1 },
    {name: '蒜蓉烤茄子', money: 32, kind: 2 },
    {name: '家常麻辣鱼', money: 32, kind: 3 },
  ],
}