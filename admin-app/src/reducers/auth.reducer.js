  import { authConstant } from '../actions/constants'
  let initState={
     user:{
       firstName:'',
       lastName:'',
       userName:'',
       email:''
     },
     token:'',
     authanticate:false,
     authanticating:false,
     loading:false
  }
  
  const authReducer=(state=initState,action)=>{
    console.log('hello in the auth reducter')
      switch(action.type){
        case authConstant.LOGIN_REQUEST:
          state={
            ...state,
            authanticating:true
          }
             break;
          case authConstant.LOGIN_SUCCES:
          state={
            ...state,
               user:action.payload.user,
               token:action.payload.token,
               authanticate:true,
               authanticating:false
          }
             break;
          case authConstant.LOGOUT_REQUEST:
            state={
              ...state,
              loading:true
            }
            break;
           case authConstant.LOGOUT_SUCCES:
            state={
             ...initState
            }
            break;
           case authConstant.LOGOUT_FAILURE:
             state={
                 ...state,
                 
             }
          break;

      }
  
     return state;
}
export default authReducer