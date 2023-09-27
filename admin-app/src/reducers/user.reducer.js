import { userConstant } from '../actions/constants'

const initState={
    loading:false,
    message:'',
    error:'',
    loaded:false
}

 const userReducer=(state=initState,action)=>{
    console.log('hello in the user reducer')
      switch(action.type){
         case userConstant.USER_REGISTER_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
            case userConstant.USER_REGISTER_SUCCES:
                state={
                    ...state,
                    loading:false,
                    message:action.payload.message,
                    loaded:true
                }
                break;
            case userConstant.USER_REGISTER_FAILURE:
                state={
                    ...state,
                    loading:false,
                    error:action.userReducerpayload.error
                }
                break;
                
      }
      return state
}
export default  userReducer