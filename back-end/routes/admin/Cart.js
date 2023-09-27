const express=require('express')
const router=express.Router()
const { requireSignIn,userMidllware }=require('../../midlllware/requireSingIn')
const { createCart,getCartItem }=require('../../controller/admin/Cart')

router.route('/create').post( requireSignIn,userMidllware,createCart )
router.route('/getCartItem').get( requireSignIn,userMidllware,getCartItem)
module.exports=router

