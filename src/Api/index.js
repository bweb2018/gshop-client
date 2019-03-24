//封装n个发送请求方法的对象
import ajax from './ajax'

//根据经纬度获取位置详情
export const reqAddress = (longitude,latitude) => ajax(`/api/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqCategorys = () => ajax('/api/index_category')

//根据经纬度获取商铺列表
export const reqShops = (latitude,longitude) => ajax('/api/shops',{latitude,longitude})

//用户名密码登陆
export const reqUserPwdLogin = ({name,pwd,captcha}) => ajax('/api/login_pwd',{name,pwd,captcha},'POST')

//发送短信验证码
export const reqSendSmsCode = (phone) => ajax('/api/sendcode',{phone})

//手机号验证码登陆
export const reqPhoneCodeLogin = (phone,code) => ajax('/api/login_sms',{phone,code},'POST')

//用户登出
export const reqUserOut = () => ajax('/api/logout')

//根据会话获取用户信息
export const reqSessionUserInfo = () => ajax('/api/userinfo')

export const reqGoods = () => ajax('/goods')
export const reqInfo = () => ajax('/info')
export const reqRatings = () => ajax('/ratings')
