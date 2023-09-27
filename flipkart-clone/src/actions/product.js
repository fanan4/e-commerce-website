import axiosInstance from "../helper"
import { ProductByslugConstant,ProductPageConstant,ProductIdConstant } from './constants'

export const productAction=(slug)=>{
      console.log('hello in product Action')
      return async (disptach)=>{
        const res=await axiosInstance.get(`product/ProductBySlug/${slug}`)
        console.log('productbySlug',res.data)
        if(res.status==200){
          disptach({
              type:ProductByslugConstant.PRODUCT_BY_SLUG_SUCEES,
              payload:res.data
          })
        }
      }
      

}
export const getProductAction=(params)=>{
    console.log('hello in getProductAction')
    const { cid,type }=params
    console.log('{ cid,type }=params',cid,type)
    return async(dispatch)=>{
       dispatch({ type:ProductPageConstant.PRODUCT_GET_PAGE_REQUEST })
       const res=await axiosInstance.get(`page/getPage/${cid}/${type}`)
       if(res.status==200){
        console.log('res dot dataaa',res.data)
           dispatch({
             type:ProductPageConstant.PRODUCT_GET_PAGE_SUCCES,
             payload:{
                 page:res.data.page
             }
            }
           )
       }
       else{
           dispatch({
            type:ProductPageConstant.PRODUCT_GET_PAGE_FAILURE,
            error:res.data.error
           })
       }
    }
}
export const getProductById=(payload)=>{
      console.log("hello in the get ProductById Action")
      console.log("payload dot params",payload.params.productId)
      const productId=payload.params.productId
      return async(dispatch)=>{
           dispatch({type:ProductIdConstant.PRODUCT_ID_GET_REQUEST})
           const res=await axiosInstance.get(`product/ProductById/${ productId }`)
           //  console.log("produc dot dataaaaaaa",res.data)
           if(res.status==200){
               dispatch({
                  type:ProductIdConstant.PRODUCT_ID_GET_SUCCES,
                  payload:{
                    product:res.data.product
                  }
               })
           }
           else{
            dispatch({
                 type:ProductIdConstant.PRODUCT_ID_GET_FAILURE,
                 payload:{
                    error:res.data.error
                 }
            })
           }
      }
}