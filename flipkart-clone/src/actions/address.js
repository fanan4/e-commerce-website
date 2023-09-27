import axiosInstance from "../helper"
import { AddressConstant } from "./constants"


export const getAddress=()=>{
    console.log("getttttt addressssss actionnnnn") 
      return async(dispatch)=>{
        const res= await axiosInstance.get('/adress/getAddress')  
        if(res.status==200){
            console.log("res dotttt statusssssss adresssssssss",res.data)
            dispatch({
                type:AddressConstant.GET_ADDRESS_SUCCES,
                payload:{
                    address:res.data.address 
                }
            })
        }
      }
}
export const addAdress=(address)=>{
    console.log('hello in add addresssssss actionnnnnn')
    return async (dispatch)=>{
        const res=await axiosInstance.post('/adress/addAdress',{ payload:address })
        if(res.status==200){
            dispatch({
                type:AddressConstant.ADD_ADDRESS_SUCCES
            })
        }
    }
}