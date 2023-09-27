const express=require("express")
const router=express.Router()
const { requireSignIn,userMidllware }=require("../../midlllware/requireSingIn")
const { addOrder,getOrders,getOrderById }=require("../../controller/user/order")
router.route('/addOrder').post(requireSignIn,userMidllware,addOrder )
router.route('/getOrders').get(requireSignIn,userMidllware,getOrders)
router.route('/getOrderById/:orderId').get(requireSignIn,userMidllware,getOrderById)
module.exports=router
