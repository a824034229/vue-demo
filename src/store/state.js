import formatDate from '@/common/js/formatDate'

let item;
let list = []
let greenList = [            /* 菜品列表 */
  {name: '香煎嫩豆腐', money: 32, kind: 1,  discounts: { type: 1 , num: 0.88 } },
  {name: '麻辣田鸡', money: 32, kind: 1 ,   discounts: { type: 2 , num: 5 }},
  {name: '蒜蓉烤茄子', money: 32, kind: 2,  discounts: { type: 2 , num: 4 } },
  {name: '家常麻辣鱼', money: 32, kind: 3,  discounts: { type: 0 , num: 0 }  },
  {name: '香煎嫩豆腐1', money: 32, kind: 1,  discounts: { type: 1 , num: 0.88 } },
  {name: '麻辣田鸡1', money: 32, kind: 1 ,   discounts: { type: 2 , num: 5 }},
  {name: '蒜蓉烤茄子1', money: 32, kind: 2,  discounts: { type: 2 , num: 4 } },
  {name: '家常麻辣鱼1', money: 32, kind: 3,  discounts: { type: 0 , num: 0 }  },
  {name: '香煎嫩豆腐2', money: 32, kind: 1,  discounts: { type: 1 , num: 0.88 } },
  {name: '麻辣田鸡2', money: 32, kind: 1 ,   discounts: { type: 2 , num: 5 }},
  {name: '蒜蓉烤茄子2', money: 32, kind: 2,  discounts: { type: 2 , num: 4 } },
  {name: '家常麻辣鱼2', money: 32, kind: 3,  discounts: { type: 0 , num: 0 }  },
  {name: '香煎嫩豆腐3', money: 32, kind: 1,  discounts: { type: 1 , num: 0.88 } },
  {name: '麻辣田鸡3', money: 32, kind: 1 ,   discounts: { type: 2 , num: 5 }},
  {name: '蒜蓉烤茄子3', money: 32, kind: 2,  discounts: { type: 2 , num: 4 } },
  {name: '家常麻辣鱼3', money: 32, kind: 3,  discounts: { type: 0 , num: 0 }  },
]

for(let i=0; i <= 30; i++){
  item = {
    id: '000' + (i + 1),           /* 暂定桌号 */
    status:  Math.round(Math.random()*3), /* 桌子状态 */
    name: (list.length + 1) +  '号桌',    /* 桌子名 */
    num: 0,                     /* 当前桌子可装人数 */
    currentNum: 0,             /* 当前桌子人数 */
    money: (Math.random()* 1000 * Math.random()).toFixed(2),  /* 消费金额 */
    date: formatDate(new Date(),'yyyy-MM-dd hh:mm:ss'),     /* 时间 */
    infos: []                   /* 消费了的菜单 */
  };

  if(item.status !== 0){
    item.infos = [            /* 菜品列表 */
      {name: '香煎嫩豆腐', money: 32, kind: 1, num: Math.ceil(Math.random() * 4),  discounts: { type: 1 , num: 0.88 } },
      {name: '麻辣田鸡', money: 32, kind: 1 , num: Math.ceil(Math.random() * 4),   discounts: { type: 2 , num: 5 }},
      {name: '蒜蓉烤茄子', money: 32, kind: 2,  num: Math.ceil(Math.random() * 4), discounts: { type: 2 , num: 4 } },
      {name: '家常麻辣鱼', money: 32, kind: 3, num: Math.ceil(Math.random() * 4),  discounts: { type: 0 , num: 0 }  },
      {name: '香煎嫩豆腐', money: 32, kind: 1,  discounts: { type: 1 , num: 0.88 } },
      {name: '麻辣田鸡', money: 32, kind: 1 ,   discounts: { type: 2 , num: 5 }},
      {name: '蒜蓉烤茄子', money: 32, kind: 2,  discounts: { type: 2 , num: 4 } },
      {name: '家常麻辣鱼', money: 32, kind: 3,  discounts: { type: 0 , num: 0 }  },
    ].splice(0,Math.ceil(Math.random() * 3))
    item.num = Math.ceil(Math.random() * 8)
  }
  list.push(item);
}

/* discounts 字段存储着 type 类型， 暂定 类型为 0 时为 不折扣， 1为 折扣率， 2 为直接计算折扣  */

export default {
  userInfo: {              /* 用户信息 */
    name: '用户名'
  },
  orderInfo: [],          /* 订单信息 */
  currentTable: 'ccc',  /* 当前桌号ID */
  diningList: list,       /* 桌子信息 */
  greenList: greenList,
  discounts: {  /*  全局打折程度， 暂定 类型为 0 时为 折扣率， 1 时为直接计算折扣 */
    type: 1,
    num: 0.85
  },
  maxDiscounts: 5         /* 全局 最多优惠 多少元 */
}