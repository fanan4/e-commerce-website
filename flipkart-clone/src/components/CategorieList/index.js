import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux/es/exports'
import { categorieAction } from '../../actions'
import './style.css'
export default function CategorieList() {
    const categoryes=useSelector(state=>state.categorie)
    const categories=categoryes.categories
    const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(categorieAction())
    },[])
    
    const rederCategorieList=( categories)=>{
        let myCategories=[]
        // myCategories.push(
        // <div   className={ child ?'parent-subCatg':'child-subCateg'}>
        //    {
        //     categories.map(category=>{
        //        return (
        //          <li>
        //             {category.name}
        //             {category.children ? rederCategorieList(category.children,child=false):[]  }
        //          </li>
        //        )
        //       })
        //    }
        // </div>
        // )
        for (let category of categories){
            myCategories.push(
                <li>
                    {
                        category.parentId ?
                        <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a>:
                        <span>{category.name}</span>
                    }
                    {
                        category.children?<ul>{rederCategorieList(category.children)}</ul>:null
                    }
                </li> 
            )
        }
            return myCategories
    }
    // const handlClickCategory=(id)=>{
    //       return(
    //         <div>
    //            {renderChildrenCategorie(id,categories)} 
    //         </div>
    //       )
    // }
    // const renderParentCategories=(categories)=>{
    //      let myCategories=[]
    //       myCategories.push(
    //         <ul className='Parent-Category'>
    //             {
    //                 categories.map(category=>{
    //                     return (
    //                         <li onClick={()=>handlClickCategory(category._id)}>{category.name}</li>
                            
    //                     )
    //                  })
    //             }
    //         </ul>
    //       )
    //       return myCategories
    // }
    // const renderChildrenCategorie=(id,categories)=>{
    //       let ParentCategorie={}
    //       ParentCategorie=categories.filter(category=>category._id===id)[0]
    //       console.log('ParentCategorie',ParentCategorie)
    //       let CategoryListt=ParentCategorie.children?rederCategorieList(ParentCategorie.children):[]
    //         console.log('CategoryList',CategoryListt)
    //         setSubCategroyList( CategoryListt )
           
    // }
  return (
    <div>
       {/* {rederCategorieList(categories)} */}
       <div className='Menu-header' style={{ zIndex:'10'}}>
            <ul >
                  {rederCategorieList(categories)}

            </ul>
       </div>
    </div>
  )
}
