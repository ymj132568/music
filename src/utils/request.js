import axios from 'axios'
const request = axios.create({
    baseURL:process.env.VUE_APP_URL,
    timeout:30000
})
request.interceptors.request.use(function(config){
    if(!config.params){
        config.params={}
    }
    config.params.t=Date.now()
    return config
},
function(error){
    return Promise.reject(error)
}
)
request.interceptors.response.use(function(response){
    return response.data
},
function(error){
    return Promise.reject(error)
}
)
export default request