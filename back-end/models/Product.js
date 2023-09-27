const mongoose=require('mongoose')
 
const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
      type:String,
      required:true,
      unique:true,
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    offer:{type:Number},
    productPictures:[
        { img:{ type:String } }
    ],
    reviews:[
                {
            userId:mongoose.Schema.Types.ObjectId,
            review:String
         }
    ],
    categorie:{ type:mongoose.Schema.Types.ObjectId ,required:true},
    createdBy: { type:mongoose.Schema.Types.ObjectId},
    quantity:{type:Number},
    upadatedAt:Date, 
    
},{ timestamps:true })
module.exports=mongoose.model('Product',ProductSchema)