const express=require("express")
const router=express.Router()
//midllwares to check the access permession
const {requireSignIn,adminMidllware}=require("../../midlllware/requireSingIn")
//controllers to handle the request
const {updateOrder,getCustomerOrders}=require('../../controller/admin/Order.admin')

router.route('/updateOrder').post(requireSignIn,adminMidllware,updateOrder) 
router.route('/getCustomerOrders').get(requireSignIn,adminMidllware,getCustomerOrders)

module.exports=router