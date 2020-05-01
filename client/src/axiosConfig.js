import axios from 'axios'
import qs from "qs"
axios.defaults.timeout=5*1000;
axios.defaults.headers.post['Content-Type']="application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.baseURL="http://121.199.49.71:3001";

//添加请求拦截器
axios.interceptors.request.use(
    config=>{
        if(config.method==='post'){
            config.data=qs.stringify(config.data);
        }
        config.headers.Authorization=localStorage.getItem("token");
        return config;
    },
    err=>{
        return Promise.reject(err);
    }
)

//发送POST请求
export function fetchPost(url,params){
    return new Promise((resolve,reject)=>{
        axios.post(url,params).then(
            res=>{
                resolve(res.data)
            },
            err=>{
                reject(err.data)
            }
        ).catch(err=>{
            reject(err.data);
        })
    })
}

//发送GET请求
export function fetchGet(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:{
            appID:localStorage.getItem("appID"),
            ...params
        }}).then(
            res=>{
                resolve(res.data);
            },
            err=>{
                reject(err.data);
            }
        ).catch(err=>{
            reject(err.data);
        })
    })
}