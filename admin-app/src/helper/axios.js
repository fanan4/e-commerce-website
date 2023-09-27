import axios from 'axios'
import  { urlApi } from '../urlApi'
import store from "../store"


const tokennnn=localStorage.getItem('token')
const axiosInstance= axios.create({
    baseURL:urlApi,
    headers:{
        'Authorization':`Bearer ${tokennnn}`
       }
})
axiosInstance.interceptors.request.use((req)=>{
  const { auth }=store.getState()
  if( auth.token ) {
    console.log('auth.token',auth.token)
    req.headers.Authorization=`Bearer ${auth.token}`
  }
   return req
})
axiosInstance.interceptors.response.use((res)=>{
     return res
},(error)=>{
    console.log(error)
    console.log('status',error.response.status)
    const { status } =error.response
    if(status==500){
        // localStorage.clear()
        store.dispatch({ type:'LOGOUT_SUCCES' })
    }
})
export default axiosInstance;