
import  { CategorieConstant } from '../actions/constants'
const initState={
     categories:[],
     loading:false,
     error:null
}

const buildCategorieList =(id,categories,newCategorie)=>{
     let myCategories=[]
       if(id==undefined){
          return [...categories,{...newCategorie.categori,children:[]}]
         
       }
       categories.map((category)=>{
          if(category._id==id){
                 myCategories.push({
                    ...category,
                    children: category.children? [...category.children,{
                         // _id:newCategorie.categori._id,
                         // name:newCategorie.categori.name,
                         // slug:newCategorie.categori.slug,
                         // categoryImage:newCategorie.categoryImage
                         ...newCategorie
                         
                    }
                    ]:[ newCategorie ]
               })
          }
          else{
               myCategories.push({
                    ...category,
                    children: category.children? buildCategorieList(id,category.children,newCategorie):[]
               })
          }
           
       })
           return myCategories
}
const CategorieReducer=(state=initState,action)=>{
     console.log('hello in getCategorieReducer ')
    switch(action.type){
     case CategorieConstant.GET_CATEGORY_REQUEST:
          state={
               ...state,
               loading:true
          }
          break;
         case CategorieConstant.GET_CATEGORY_SUCCES:
            state={
                ...state,
                loading:false,
                categories:action.payload.categories
            }
            break;
          case CategorieConstant.GET_CATEGORY_FAILURE:
               state={
                    ...state,
                    loading:false
               }
          case CategorieConstant.ADD_CATEGORY_REQUEST:
              
               state={
                ...state,
                   loading:true,
               }
            break;
          case CategorieConstant.ADD_CATEGORY_SUCCES:
               console.log('hello in add category succes')
               const newCategorie=action.payload.category
               console.log('newCategorie',newCategorie)
               const id=newCategorie.categori.parentId
               console.log('parentId',id)
               const updatCategorie=buildCategorieList(id,state.categories,newCategorie)
               console.log('update categorie',updatCategorie)
             
               state={
                    ...state,
                    loading:false,
                    categories:updatCategorie
               }
            break;
          case CategorieConstant.ADD_CATEGORY_FAILURE:
               state={
                    ...initState
               }
          break;
    }
     
    return state
}
export default CategorieReducer