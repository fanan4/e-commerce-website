const Order=require("../../models/Order")
const {StatusCodes}=require('http-status-codes')
exports.updateOrder=(req,res,next)=>{
    const { orderId,type }=req.body
    console.log('the order issssss',req.body)
    Order.findOneAndUpdate({ _id:orderId,"orderStatus.type":type },{
        "$set":{
            "orderStatus.$":[{
                 type:type, date: new Date(), isCompleted:true 
            }]
        }
    }).exec((error,order)=>{
        if(error) res.status(400).send(error)
        if(order){
            res.status(200).json({order}) 
        }
        else{
            res.status(StatusCodes.NOT_FOUND).send("order not found")
        }
    })
}
exports.getCustomerOrders=(req,res,next)=>{
    Order.find({})
         .populate("items.productId", "name")
        .exec((error,orders)=>{
             if(error) res.status(400).send(error)
             if(orders){
                res.status(200).json({orders})
             }
             else{
                res.status(404).send("order not found")
             }
        })
}