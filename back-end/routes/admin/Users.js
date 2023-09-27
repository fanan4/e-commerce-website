const express=require('express')
const router=express.Router()
const { signIn,signUp,singOut }=require('../../controller/admin/auth')
const { SignUpvalidationRequest,SignInvalidationRequest,isRequestValidated }=require('../../validator/validationRequest')
const { requireSignIn,adminMidllware }=require('../../midlllware/requireSingIn')
router.route('/signUp').post(SignUpvalidationRequest,isRequestValidated,signUp) 
router.route('/signIn').post(SignInvalidationRequest,isRequestValidated,signIn)
router.route('/singOut').post( requireSignIn,adminMidllware,singOut)

module.exports=router
