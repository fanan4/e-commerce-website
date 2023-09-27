const express=require('express')
const router=express.Router()
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

const { AddCategorie,getCategorie,updateCategorie,deletCategory }=require('../../controller/admin/Categorie')
const { requireSignIn,adminMidllware }=require('../../midlllware/requireSingIn')

router.route('/addCategory').post( requireSignIn,adminMidllware,upload.single('categoryImage'),AddCategorie )
router.route('/getCategory').get( /*requireSignIn,adminMidllware,*/getCategorie )
router.route('/updateCategory').patch(upload.array('categoryImage'),updateCategorie)
router.route('/deletCategory').post(upload.array('categoryImage'),deletCategory)

module.exports=router