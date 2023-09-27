import { ProductConstant } from '../actions/constants'

const initState={
    products:[]
}
 const  productReducer=(state=initState,action)=>{
    console.log('hello in the productReducer')
     switch(action.type){
         case ProductConstant.GET_PRODUCT_SUCCES:
            console.log('GET_PRODUCT_SUCCES')
            state={
                ...state,
                products:action.payload.product
            }
            break;
        case ProductConstant.ADD_PRODUCT_SUCCES:
            console.log('ADD_PRODUCT_SUCCES')
            let myProduct= state.products
            state={
                ...state,
                products:[...myProduct,action.payload.product]
            }
            break;
     }
       return state

}
export default productReducer