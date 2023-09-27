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
  exports.upload=multer({ storage }) 