//封装ajax函数模块
import axios from 'axios'

export default function ajax (url,data = {},type = 'GET') {
  let promise
  return new Promise((resolve,reject) => {
    if(type === 'GET'){
      promise = axios.get(url, {params: data})
    } else {
      promise = axios.post(url,data,type)
    }
    promise.then((respone) => {
      resolve(respone.data)
    }).catch((error) => {
      alert(error)
    })
  })

}
