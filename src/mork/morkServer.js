
import Mock from 'mockjs'
import shop from './shop.json'

Mock.mock('/goods',{code:0,data:shop.goods})
Mock.mock('/info',{code:0,data:shop.info})
Mock.mock('/ratings',{code:0,data:shop.ratings})
