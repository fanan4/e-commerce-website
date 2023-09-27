const mongoose=require('mongoose')
 const PageSchema=new mongoose.Schema({
     title:{
        type:String,
        required:true,
        trim:true
     },
     descritpion:{
        type:String,
        required:true,
        trim:true
     },
     banners:[
        {
            img:{ type:String },
            NavigateTo:{ type:String }
        }
     ],
     type:{
        type:String
     },
     products:[
        {
            img:{ type:String },
            NavigateTo:{ type:String }
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categorie',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }

 },{ timestamps:true })

 module.exports=mongoose.model('Page',PageSchema)