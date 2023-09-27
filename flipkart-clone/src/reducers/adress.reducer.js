import { AddressConstant, OrderConstant } from '../actions/constants'
const initState={
   addressItems:[],
   orders:[],
   order:{}
}

const addressReducer=(state=initState,action)=>{
      switch(action.type){
        case AddressConstant.GET_ADDRESS_SUCCES:
            console.log("getttt from reducer addddddddddress successssssssss",action.payload.address)
            state={
                ...state,
                addressItems:action.payload.address
            }
         break;  
         case OrderConstant.GET_ORDER_SUCCES:
            state={
               ...state,
                orders:action.payload.orders
            }  
            break;    
         case OrderConstant.GET_ORDER_BYID_SUCCES:
            state={
               ...state,
               order:action.payload.order
            }    
      }
      return state
}
export default addressReducer