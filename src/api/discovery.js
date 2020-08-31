import request from '@/utils/request';
export function banner(){
      return request({
          url:'/banner',
          method:'get'
      })
}
export function songlist({limit=10}={}){
    return request({
        url:'/personalized',
        method:'get',
        params:{
            limit
        }
    })
}
export function mv(){
    return request({
        url:'/personalized/mv',
        method:'get',
    })
}
export function newsong(){
    return request({
        url:'/personalized/newsong',
        method:'get',
    })
}
export function songUrl({id}){
    return request({
        url:'/song/url',
        method:'get',
        params:{
            id
        }
    })
}
