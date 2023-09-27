import axiosInstance from "../helper/axios";
import { PageConstant } from "./constants";
export const CreatePage=(form)=>{
      console.log('hello in create Pageeee  ')
      return async(dispatch)=>{
        try {
             dispatch({ type:PageConstant.ADD_PAGE_REQUEST })
             const res=await axiosInstance.post('/page/createPage',form)
                 if(res.status==200){
               dispatch({
                  type:PageConstant.ADD_PAGE_SUCCES,
                  payload:{
                      page:res.data.page
                  }
             })
           }
           else{
            dispatch({
                type:PageConstant.ADD_PAGE_FAILURE,
                payload:{
                    error:res.data.error
                }
            })
         }
         }
         catch (error) {
            console.log(error)
        }
         
      }
    
}