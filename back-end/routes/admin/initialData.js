const express=require('express')
const router=express.Router()
const { initialData }=require('../../controller/admin/initialData')
const { requireSignIn,adminMidllware }=require('../../midlllware/requireSingIn')

router.route('/initialData').get( requireSignIn,adminMidllware,initialData)

module.exports=router