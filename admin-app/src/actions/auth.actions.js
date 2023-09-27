import { authConstant,userConstant } from './constants'
import axiosInstance from '../helper/axios'

export  const registre =(user)=>{
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
export  const login =(user)=>{
  console.log('hello in the action')
  return async (dispatch)=>{
      //determine that the app is in the authanficating state
      
       dispatch({ type:authConstant.LOGIN_REQUEST })
       console.log("dispatched the login request")
       //send a post request to login
       const res= await axiosInstance.post('/admin/signIn',{
        ...user
       })
      
        //see if the request is succed
         if(res.status===200){
            const { token,user } =res.data;
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
            dispatch({
              type:authConstant.LOGIN_SUCCES,
              payload:{
                  token, user
              }
          });
          console.log("dispatched the login request succes")
         }
         //in case the request is failed

         else if(res.status===400){
          dispatch({
            type:authConstant.LOGIN_FAILURE,
            payload:{
             error:res.data.error
            }
          })
          console.log("dispatched the login request failed")
         }
         
  }
}
export const isLogedIn=()=>{
    const token=localStorage.getItem('token')
  if(token){
     return async(dispatch)=>{
      dispatch({
        type:authConstant.LOGIN_SUCCES,
        payload:{
            token
        }
    })
     }
  }
  else{
      return async(dispatch)=>{
        dispatch({
          type:authConstant.LOGIN_FAILURE,
          payload:{
           error:'need to login ',
           authanticate:false
          }
        })
      }
    
  }

}
export const signOut=()=>{
      console.log('----hello in the logout----')
      // const token=localStorage.getItem('token')
      return async(dispatch)=>{
      dispatch({ type:authConstant.LOGOUT_REQUEST })
      console.log('----dispatched log out -----')

      const res= await axiosInstance.post('/admin/singOut')
      if(res.status===200){
        console.log('logout succed')
         localStorage.clear()
           dispatch({
              type:authConstant.LOGOUT_SUCCES,
              payload:{
                  message:res.data.message
              }
           })
      }
      else{
        console.log('logout failed')
          dispatch({
              type:authConstant.LOGOUT_FAILURE,
              message:res.data.error
          })
      }
    }
}