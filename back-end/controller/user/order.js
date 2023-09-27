const Order =require("../../models/Order")
const Address=require("../../models/Address")
const Cart=require("../../models/Carte")
exports.addOrder=async(req,res,next)=>{
    Cart.deleteOne({user:req.user.id})
      .exec((error,cart)=>{
        if(error) return res.status(400).send(error)
        if(cart){
            req.body.user=req.user.id
            const order=new Order(req.body)
            order.save((error,order)=>{
                      if(error) res.status(400).send(error)
                      if(order){
                         res.status(200).json(order)
                      }
                 })
        }
    })
  
}
exports.getOrders=async(req,res,next)=>{
     Order.find({ user:req.user.id })
     .populate("items.productId","_id name productPictures")
     .exec((error,order)=>{
        if(error) return res.status(400).send(error)
        if(order){
            Address.findOne({user:req.user.id})
            .exec((error,address)=>{
                if(error) res.status(400).send(error)
                if(address){
                    //order.address=address.address.find(item=>item._id.toString()==order.addressId.toString())
                    console.log("addressIddd",order.address)
                    res.status(200).json({ order });   
                }
            })
        }
     })
}
exports.getOrderById=async(req,res,next)=>{
    const { orderId }=req.params
    Order.findOne({ _id:orderId })
    .exec((error,order)=>{
        if(error) return res.status(400).send(error)
        if(order){
            return res.status(200).json({order})
        }
    })
}
