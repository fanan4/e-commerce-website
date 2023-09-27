import { userConstant } from './constants'
import axiosInstance from '../helper/axios'

export  const singUp =(user)=>{
    console.log('hello in the action')
    
    return async (dispatch)=>{
        //determine that the app is in the authanficating state
        
         dispatch({ type:userConstant.USER_REGISTER_REQUEST })
         console.log("dispatched the login request")
         //send a post request to login
         const res= await axiosInstance.post('/admin/signUp',{
          ...user
         })
        
          //see if the request is succed
           if(res.status===200){
            const { message }=res.data;
              dispatch({
                type:userConstant.USER_REGISTER_SUCCES,
                payload:{ 
                    message
                }
            });
            console.log("dispatched the login request succes")
           }
           //in case the request is failed

           else if(res.status===400){
            dispatch({
              type:userConstant.USER_REGISTER_FAILURE,
              payload:{
               error:res.data.error
              }
            })
            console.log("dispatched the login request failed")
           }
           
    }
}