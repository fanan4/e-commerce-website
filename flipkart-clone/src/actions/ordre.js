import axiosInstance from "../helper"
import { OrderConstant } from "./constants"

export const addOrder=(payload)=>{
      console.log("hello in add Order action")
       return async (dispatch)=>{
          const res=await axiosInstance.post('/order/addOrder',payload)
          if(res.status==200){
              console.log("orderrrrrrrrrrsss",res.data)
              dispatch({
                type:OrderConstant.ADD_ORDER_SUCCES,
                payload:{
                    order:res.data,
                }
              })
          }
       }
 }
 export const getOrder=()=>{
    console.log("hello in get Order action")
    return async (disptach)=>{
        const res=await  axiosInstance.get('/order/getOrders')
        if(res.status==200){
            disptach(
                {
                    type:OrderConstant.GET_ORDER_SUCCES,
                    payload:{
                       orders:res.data.order
                     }
                }
            )
        }
    }
 }
 export const getOrderById=(orderId)=>{
     console.log("hello in get Order By Id")
     return async(dispatch)=>{
        const res=await axiosInstance(`/order/getOrderById/${orderId}`)
        if(res.status==200){
            dispatch({
                type:OrderConstant.GET_ORDER_BYID_SUCCES,
                payload:{
                    order:res.data.order
                }
            })
        }
     }
 }
