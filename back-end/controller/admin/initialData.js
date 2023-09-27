const Categorie=require('../../models/Categories')
const Product=require('../../models/Product')

createCategories=function(categories,parentId=null){
    let CategorieList=[]; 
    let category=[];
    if(parentId==null){
       category=categories.filter(cat => cat.parentId==undefined)
    }
    else{
      category=categories.filter(cat => cat.parentId==parentId)
    }
    for(let cate of category){
      CategorieList.push({
        _id:cate._id,
        categoryImage:cate.categoryImage,
        name:cate.name,
        slug:cate.slug,
        type:cate.type,
        parentId:cate.parentId,
        children:createCategories(categories,cate._id)
      })
    }
    return CategorieList
}

exports.initialData= async (req,res,next)=>{
    
       const category=await Categorie.find({}).exec()
       const CategorieList=createCategories(category)
       const product=await Product.find({})
       .select('_id name categorie quantity price description productPictures')
       .exec()
       res.status(200).json({
           category:CategorieList,
           product
       })
}