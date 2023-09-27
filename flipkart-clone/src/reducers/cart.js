import { cartConstant } from "../actions/constants"
const initState={
    cartItems:{}
}
const  cartReducer=(state=initState,action)=>{
    console.log("hello in cartReducer ")
    switch(action.type){
        case cartConstant.Add_To_Cart:
            console.log("from reducerrrrr",action.payload.cartItems)
            state={
                ...state,
                cartItems:action.payload.cartItems
            }
            break;
            case cartConstant.RESET_CART:
                state={
                    ...initState
                }
                break;
    }
       
    return state;
}
export default cartReducer