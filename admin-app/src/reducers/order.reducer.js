import { orderConstant } from "../actions/constants"

const initState={
    orders:[],
}
export const orderReducer=(state=initState,action)=>{
      switch(action.type){
         case orderConstant.GET_ORDER_SUCCES:
            state={
                ...state,
                orders:action.payload.orders
            }
            break;
      }
      return state;
}