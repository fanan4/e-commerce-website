const { StatusCodes }=require('http-status-codes')
const Categorie=require('../../models/Categories')
const slugify=require('slugify')
const { findOneAndDelete } = require('../../models/Categories')
exports.AddCategorie=(req,res,next)=>{
  const categorieObj ={ 
    name:req.body.name,
    slug:slugify(req.body.name),
    type:req.body.type
  }
  if(req.body.parentId){
      categorieObj.parentId=req.body.parentId
  }
  if( req.file ){
    categorieObj.categoryImage=req.file.filename
    
  }
  const cat=new Categorie(categorieObj)
  cat.save((error,categori)=>{
      if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)
      if(categori){
        return res.status(StatusCodes.OK).json({ categori })
      }
  })
}
 createCategories=function(categories,parentId=null){
      let CategorieList=[]; 
      let category=[];
      if(parentId==null){
         category=categories.filter(cat => cat.parentId==null)
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
exports.getCategorie=(req,res,next)=>{
   Categorie.find({})
             .exec((error,categorie)=>{
                 if(error) return res.status(StatusCodes.BAD_REQUEST).send(error)
                 if(categorie){
                      const CategorieList=createCategories(categorie)
                      res.status(StatusCodes.OK).json({ CategorieList })
                 }
             })
}
exports.updateCategorie=async(req,res,next)=>{
    const {name,type,parentId,_id}=req.body
    console.log('name',name)
    console.log('parentId',parentId)
    const updatedCategory=[]
    if(name instanceof Array){
           for( let i=0;i<name.length;i++ ){
               const category={
                name:name[i],
                type:type[i],
               }
               if( parentId  ){
                 if(parentId[i] !=''){
                  category.parentId=parentId[i]
                 } 
               }
               const ress=await Categorie.findOneAndUpdate({_id:_id[i]},category,{new:true})
               updatedCategory.push(ress) 
           }
           res.status(StatusCodes.OK).json({updateCategories: updatedCategory})
    }
    else{
      const category={
         name,
         type,
      }
      if( parentId  ){
        category.parentId=parentId
     }
      const ress=await Categorie.findOneAndUpdate({_id},category,{new:true})
      res.status(StatusCodes.OK).json({updateCategory: ress})
    } 
}
exports.deletCategory=async(req,res,next)=>{
  console.log('hello in deletCategory controller')

   const { _id }=req.body 
   const deletedCategories=[]
   console.log( '_id',req.body )
   if( _id instanceof Array ){
      for(let i=0;i<_id.length;i++){
        if(_id!=''){
          const result=await Categorie.findOneAndDelete({_id:_id[ i ]}) 
          result && deletedCategories.push(result)
        }
      }
      res.status(200).json({deletedCategories:deletedCategories})
   }
   else{
      if(_id!=''){
      const result=await  Categorie.findOneAndDelete({_id:_id})
      res.status(200).json({deletedCategories:result})
    }
   }
}