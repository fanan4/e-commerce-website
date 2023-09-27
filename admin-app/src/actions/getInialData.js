import axiosInstance from "../helper/axios"
import {CategorieConstant,ProductConstant } from './constants'
export const getInitialAction=()=>{
    console.log('hello in the getInitial Data')
    return async (dispatch)=>{
        const res =await axiosInstance.get('/initialData')
        if(res.status===200){
            const { category,product }=res.data
            dispatch({
                type:CategorieConstant.GET_CATEGORY_SUCCES,
                payload:{
                    categories:category
                 }
                })
                 
                 dispatch({
                    type:ProductConstant.GET_PRODUCT_SUCCES,
                    payload:{
                       product:product
                     }
        })
    }
}
}