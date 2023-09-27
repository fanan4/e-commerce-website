const express=require("express")
const router=express.Router()
const { addUserAdress,getUserAdress }=require("../../controller/user/adress")
const { requireSignIn,userMidllware }=require("../../midlllware/requireSingIn")
router.route("/addAdress").post( requireSignIn,userMidllware,addUserAdress )
router.route("/getAddress").get( requireSignIn,userMidllware,getUserAdress )
module.exports=router