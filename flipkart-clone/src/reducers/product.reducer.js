import {ProductByslugConstant,ProductPageConstant,ProductIdConstant } from '../actions/constants'
const initState={
    products:[],
    productsByPrices:{
        under5K: [],
        under10K: [],
        under20K: [],
        under30K: []
    },
    page:{},
    productDetails:'',
    loading:false,
    pageRequest:false,
    error:''
}
const productReducer=(state=initState,action)=>{
    console.log('hello in product Reducer')
   switch(action.type){
     case ProductByslugConstant.PRODUCT_BY_SLUG_SUCEES:
        state={
            ...state,
            products:action.payload.products,
            productsByPrices:{
                ...action.payload.productsByPrices
            }
        }
        break;
        case ProductPageConstant.PRODUCT_GET_PAGE_REQUEST:
          state={
            ...state,
            pageRequest:true,
          }
          break;
          case ProductPageConstant.PRODUCT_GET_PAGE_SUCCES:
            state={
                ...state,
                pageRequest:false,
                page:action.payload.page
            }
            break;
          case ProductPageConstant.PRODUCT_GET_PAGE_FAILURE:
            state={
                ...state,
                pageRequest:false,
                error:action.payload.error
            }
            break;
          case ProductIdConstant.PRODUCT_ID_GET_REQUEST:
          state={
            ...state,
               loading:true,
          }  
          break;
          case ProductIdConstant.PRODUCT_ID_GET_SUCCES:
            state={
              ...state,
              loading:false,
              productDetails:action.payload.product
            }
          break;
          case ProductIdConstant.PRODUCT_ID_GET_FAILURE:
            state={
              ...state,
              loading:false,
              error:action.payload.error
            }  
   }
   
   
   return state
}
export default productReducer