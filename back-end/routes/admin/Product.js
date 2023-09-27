const express=require('express')
const router=express.Router()
const { AddProduct,getProduct ,ProductBySlug,ProductById }=require('../../controller/admin/Product')
const { requireSignIn,adminMidllware }=require('../../midlllware/requireSingIn')
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
router.route('/addProduct').post( requireSignIn,adminMidllware,upload.array('productPictures'),AddProduct )
router.route('/getProducts').get( requireSignIn,adminMidllware,getProduct )
router.route('/ProductBySlug/:slug').get( ProductBySlug ) 
router.route('/ProductById/:productId').get( ProductById )
module.exports=router