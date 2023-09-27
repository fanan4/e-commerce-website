import { combineReducers } from "redux";
import categorieReducer from "./categorie.reducer";
import productReducer from "./product.reducer";
import authReducer from "./auth.reducer";
import cartReducer from "./cart";
import addressReducer from "./adress.reducer";
const rootReducer=combineReducers({
     categorie:categorieReducer,
     product:productReducer,
     auth:authReducer, 
     cart:cartReducer,
     address:addressReducer 
})
export default rootReducer