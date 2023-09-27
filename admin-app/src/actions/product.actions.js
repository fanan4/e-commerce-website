import axiosInstance from "../helper/axios";
import { ProductConstant } from './constants'
export const addPorductAction=(form)=>{
   console.log('hello in the addPorduct action')
    return async (dispatch)=>{
        const res= await axiosInstance.post('/product/addProduct',form)
        if(res.status===200){
            console.log('product created',res)
            dispatch({
                type:ProductConstant.ADD_PRODUCT_SUCCES,
                payload:{
                    product:res.data
                }
            })
        }
       
    }
   
}