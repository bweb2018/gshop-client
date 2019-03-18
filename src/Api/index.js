//封装n个发送请求方法的对象
import ajax from './ajax'

//根据经纬度获取位置详情
export const reqAddress = () => ajax('/api/position/40.10038,116.36867')

//获取食品分类列表

export const reqCategorys = () => ajax('/api/index_category')

//根据经纬度获取商铺列表

export const reqShops = (latitude,longitude) => ajax('/api/shops',{latitude,longitude})
