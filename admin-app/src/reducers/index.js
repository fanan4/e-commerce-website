import authReducer from './auth.reducer'
import userReducer from './user.reducer';
import CategorieReducer from './Categorie.reducer';
import productReducer from './product.reducer';
import pageReducer from './page.reducer';
import { combineReducers } from 'redux'
import { orderReducer } from './order.reducer';
const rootReducer= combineReducers({
    auth:authReducer,
    user:userReducer,
    categorie:CategorieReducer,
    product:productReducer,
    page:pageReducer,
    order:orderReducer
});
export default rootReducer;