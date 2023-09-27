import axios from 'axios'
import  { urlApi } from '../urlApi'
import store from '../store'
 const token=localStorage.getItem('token')
const axiosInstance= axios.create({
    baseURL:urlApi,
     headers:{
        'Authorization':`Bearer ${token}`
        }
})
axiosInstance.interceptors.request.use((req)=>{
    const { auth }=store.getState()
    if( auth.token ) {
      // console.log('auth.token',auth.token)
      req.headers.Authorization=`Bearer ${auth.token}`
    }
     return req
  })
export default axiosInstance;
