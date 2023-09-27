import {categorieConstant} from '../actions/constants'
const initState={
    categories:[]
}


const categorieReducer=(state=initState,action)=>{
     console.log('hello in the caegorie Reducer')
     switch(action.type){
        case categorieConstant.GET_CATEGORY_SUCCES:
            state={
                ...state,
                categories:action.payload.categories
            }
            break;
     }
      return state
}
export default categorieReducer