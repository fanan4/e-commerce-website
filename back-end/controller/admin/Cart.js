const { StatusCodes }=require('http-status-codes')
const Cart = require('../../models/Carte')
let carte=""
exports.createCart=(req,res,next)=>{
    Cart.findOne({ user:req.user.id })
        .exec((error,cart)=>{
            if(error) return res.status(StatusCodes.NOT_FOUND).json({error})
            if(cart){
                //check if product is already exist 
                 console.log('-----update carte------')
                const product=req.body.cartItmes.product
                const item=cart.cartItmes.find( cb=>cb.product==product )
                let condition,update
                if(item){
                     console.log('item exist')
                     condition={ user:req.user.id, 'cartItmes.product':product }
                     //let qty=req.body.cartItmes.quantity
                     update={
                        '$set':{
                           "cartItmes.$":{
                               ...req.body.cartItmes,   
                           } 
                        }
                       }  
                }
                else{
                    condition={ user:req.user.id }
                    update={
                        '$push':{
                            'cartItmes':req.body.cartItmes 
                        }
                    }    
                }
              Cart.findOneAndUpdate(condition,update,{ new:true })
                  .exec((error,carte)=>{
                    if(error) return res.status(StatusCodes.BAD_REQUEST).json({error})
                    if(carte){
                                return res.status(StatusCodes.OK).json({_cart: carte})
                            }
                  }) 
            } 
            else{
                console.log('------crate a new carte-----')      
               //Create a new product 
                 carte=new Cart({
                    user:req.user.id,
                    cartItmes:req.body.cartItmes
                })
                carte.save((error,cart)=>{
                    if(error) return res.status(StatusCodes.BAD_REQUEST).json({error})
                    if(cart){
                                return res.status(StatusCodes.OK).json({_cart: cart})
                            }
                })
            }
            
        })
}
exports.getCartItem=async(req,res,next)=>{
       let newCartItem={}
       Cart.findOne({user:req.user.id})
         .populate("cartItmes.product", "_id name price productPictures quantity")
          .exec((error,cart)=>{
            if(error) res.status(400).send(error)
            if(cart){
                cart.cartItmes.map((item,key)=>{
                    if(item.product){
                        newCartItem[item.product._id]={
                            id:item.product._id, 
                            name:item.product.name,
                            quantity:item.quantity,
                            img:item.product.productPictures&&item.product.productPictures.length >0 ?item.product.productPictures[0].img:null,
                            price:item.product.price
                       }
                    }
                    
                })
                res.status(200).json( newCartItem )
                //   res.status(200).json({ cart })
            }
          })
}
