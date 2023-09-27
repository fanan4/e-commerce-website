import React, { useEffect } from 'react'
import axiosInstance from '../helper/axios'
import { orderConstant } from './constants'

export const  getOrderAction=()=>{
    console.log("hello in order Action")
    return async(dispatch)=>{
        const res=await axiosInstance.get('Aorder/getCustomerOrders')
        if(res.status==200){
            dispatch({
                type:orderConstant.GET_ORDER_SUCCES,
                payload:{
                    orders:res.data.orders
                }
            })
        }
    }
}
export const updateOrder=(payload)=>{
    console.log("hello in update Category Action")
    console.log("payloaaaaad order is     :",payload)
    return async(dispatch)=>{
        // const res=await axiosInstance.get('Aorder/getCustomerOrders')
        const res=await axiosInstance.post('/Aorder/updateOrder',payload
            //   {
                
            //     ...payload
            //   }
        ) 
        
          if(res.status==200){
             dispatch( getOrderAction() )
          }
    }
}
