const Product=require('../../models/Product')
const Categorie=require('../../models/Categories')
const { StatusCodes }=require('http-status-codes')
const slugify=require('slugify')
exports.AddProduct=(req,res,next)=>{
     const {
        name,
        price,
        description,
        categorie,
        quantity
     }=req.body;
     let productPictures=[];
   
     if( req.files.length>0 ){  
            productPictures=req.files.map( file=>{
             return   { img: file.filename }
            })
     }
     const product=new Product({
        name,
        slug:slugify(name),
        price:Number(price),
        description,
        productPictures,
        categorie,
        quantity,
        createdBy:req.user.id
     })
     product.save((error,product)=>{
        if(error) return res.status( StatusCodes.BAD_REQUEST ).json({ error})
        if(product) {
            res.status( StatusCodes.OK ).json(product)
        }
     })
}
exports.ProductBySlug=(req,res,next)=>{
   const { slug }=req.params
  
   Categorie.findOne({ slug:slug })  
     .exec((error,category)=>{
         if(error) {
            return res.status(400).json({error})
         }
         if(category){
            Product.find({categorie:category._id})
            .exec((error,products)=>{
               if(error) res.status(400).json({error})
               if(products){
                  //to know the type of page to display check the categorie type
                  if(category.type){
                     res.status(200).json({
                        products,
                        productsByPrices:{
                              under5K:products.filter(product=>product.price<5000),
                              under10K:products.filter(product=>product.price>5000 &&product.price<=10000 ),
                              under20K:products.filter(product=>product.price>10000 &&product.price<=20000 ),
                              under30K:products.filter(product=>product.price>20000 &&product.price<=30000 ),
                        }
                     })
                  }
                  
               }
               else{
                  //the page has no type 
                  res.status(200).json({ products })
               }
            }) 
         }
        
     })
}
exports.getProduct=async (req,res)=>{
      res.status(200).json({product:"getProducts"});
}
exports.ProductById=async (req,res)=>{
    const { productId }=req.params;
    Product.findOne({ _id:productId } )
           .exec((error,product)=>{
              if(error) res.status(400).json({error})
              if(product){
                 res.status(200).json({ product })
              }
           })
}