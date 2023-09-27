const mongoose=require('mongoose')
 
const CartSchema=new mongoose.Schema({
    user:{ type:mongoose.Schema.Types.ObjectId,ref:'Users'},
    cartItmes:[

        {
            product:{ type:mongoose.Schema.Types.ObjectId,ref:'Product' },
            quantity:{ type:Number,default:1 },
            price: { type:Number,required:true } 
        }
    ]
},{ timestamps:true })
module.exports=mongoose.model('Cart',CartSchema)