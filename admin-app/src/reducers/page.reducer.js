import { PageConstant } from '../actions/constants'

const initState={
    loading:false,
    page:{},
    error:''
}

const pageReducer=(state=initState,action)=>{
    console.log('hello in pageReducer')
    switch( action.type ){
        case PageConstant.ADD_PAGE_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case PageConstant.ADD_PAGE_SUCCES:
            state={
                ...state,
                loading:false,
                page:action.payload.page
            }
            break;
        case PageConstant.ADD_PAGE_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
    }
    return state
}
export default pageReducer