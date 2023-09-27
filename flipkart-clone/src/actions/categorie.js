import axiosInstance from "../helper";
import { categorieConstant } from './constants'
export const categorieAction=()=>{
    console.log('hello in the categorie Action')
    return async(dispatch)=>{
        const res=await axiosInstance.get('/categorie/getCategory')
        console.log("this res",res)
        if(res.status){
            dispatch({
                type:categorieConstant.GET_CATEGORY_SUCCES,
                payload:{
                    categories:res.data.CategorieList
                }
            })
        }
    }
}