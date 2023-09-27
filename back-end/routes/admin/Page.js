const express=require('express')
const router=express.Router()
const { createPage,getPage }=require('../../controller/admin/Page')
const {requireSignIn,adminMidllware} =require ('../../midlllware/requireSingIn')

const multer=require('multer')
const path=require('path')
const shortid=require('shortid')

//prepare the destionation and the name of the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  const upload=multer({ storage }) 

router.route('/createPage').post(requireSignIn,adminMidllware,upload.fields([
    { name:'banners' },
    { name:'products' },
]),createPage)
router.route('/getPage/:category/:type').get(getPage)
module.exports=router