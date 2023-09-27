const LinearCategories=(categories,options=[])=>{
    categories.map(category=>{ 
         options.push({ value:category._id,name:category.name ,type:category.type, parentId: category.parentId && category.parentId})
         if( category.children && category.children.length>0){
             LinearCategories(category.children,options)
         }
     })
     console.log(options)
    return options
}
export default LinearCategories