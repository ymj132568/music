import request from '@/utils/request'
export function mvUrl({id}){
    return request({
        url:'/mv/url',
        method:'get',
        params:{
            id
        }
    })
}
export function simiMV({mvid}){
    return request({
        url:'/simi/mv',
        method:'get',
        params:{
            mvid
        }
    })
}
export function mvDetail({mvid}){
    return request({
        url:'/mv/detail',
        method:'get',
        params:{
            mvid
        }
    })
}
export function artistInfo({artistId}){
    return request({
        url:'/artists',
        method:'get',
        params:{
            id:artistId
        }
    })
}
export function mvComments({id,offest}){
    return request({
        url:'/comment/mv',
        method:'get',
        params:{
            id,
            offest,
            limit:5
        }
    })
}