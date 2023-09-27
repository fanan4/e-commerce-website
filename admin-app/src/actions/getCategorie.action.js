
import axiosInstance from '../helper/axios'
import axios from 'axios'
import  { CategorieConstant } from './constants'
 const   getCategories=()=>{
        console.log('hello in get Categorie action')
        
        return async (dispatch)=>{
           dispatch({type:CategorieConstant.GET_CATEGORY_REQUEST})
           console.log(' dispatched the GET_CATEGORY_REQUEST')
           const res=await axiosInstance.get('/categorie/getCategory') 
         
             if(res.status===200){
                const { CategorieList } =res.data
                dispatch({
                   type:CategorieConstant.GET_CATEGORY_SUCCES,
                   payload:{
                        categories:CategorieList
                   }
                })
             }
             else{
                dispatch({
                        type:CategorieConstant.GET_CATEGORY_FAILURE,
                         payload:{
                                error:res.data.error
                         }
                
                })
             }
          
        }
        
}
export const addCategory=(form)=>{
   
   return async (dispatch)=>{
        console.log('hell in add category actions')
        dispatch({type:CategorieConstant.ADD_CATEGORY_REQUEST});
        const res=await axiosInstance.post('/categorie/addCategory',form)
        if(res.status===200){
          console.log('the created category',res.data)
          dispatch({
            type:CategorieConstant.ADD_CATEGORY_SUCCES,
            payload:{
               category:res.data
             }
          })
        }
        else{
         dispatch({
            type:CategorieConstant.ADD_CATEGORY_FAILURE,
            payload:{
               error:res.data.error
            }
            
          })
        }
   }

}
export const updateCategorieAcion=(form)=>{
   
   return async (dispatch)=>{
        console.log('hello in update category actions')
          dispatch({type:CategorieConstant.UPDATE_CATEGORY_REQUEST});
          const res=await axiosInstance.patch('/categorie/updateCategory',form)
           if(res.status===200){
            dispatch(getCategories())
            dispatch({
             type:CategorieConstant.UPDATE_CATEGORY_SUCCES,
             payload:{
                msg:'categorie updated succefely'
             }
           })
         
           console.log('the created category',res.data)
           return true
         }
         else{
           dispatch({
             type:CategorieConstant.UPDATE_CATEGORY_FAILURE
           })
         }
        }
        
   }

export const deletCategoryAction=(checked)=>{
   console.log('checkAction',checked)
   console.log('hello in the deletCategory Action')
   return async (dispatch)=>{
   //   dispatch({type:CategorieConstant.DELETE_CATEGORY_REQUEST});
      const res =await axiosInstance.post('/categorie/deletCategory',{
         _id:checked
      })
      // const res= await axios.delete('http://localhost:3000/api/categorie/deletCategory', { data: { _id: checked }, headers: { "Authorization": "***" } });
      if(res.status==200){
         
         dispatch(getCategories())
         
      }
   }
}
export {
   getCategories
}
