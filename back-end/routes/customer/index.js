const express=require('express');
const { singOut, signIn, signUp } = require('../../controller/user/auth');
const router=express.Router();

const { SignUpvalidationRequest,SignInvalidationRequest,isRequestValidated }=require('../../validator/validationRequest')
const { requireSignIn,adminMidllware }=require('../../midlllware/requireSingIn')

router.route('/signUp').post(SignUpvalidationRequest,isRequestValidated,signUp) 
router.route('/signIn').post(SignInvalidationRequest,isRequestValidated,signIn)
// router.route('/singOut').post( requireSignIn,adminMidllware,singOut)

module.exports=router;