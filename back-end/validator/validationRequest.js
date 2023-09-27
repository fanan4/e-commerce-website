const { check }=require('express-validator')
const { validationResult }=require('express-validator')
exports.SignUpvalidationRequest=[
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
     check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .isEmail()
    .withMessage('email is required'),
     check('hash_password')
    .isLength({ min:6 })
    .withMessage('password should contain more than 6 caracters'),
]
exports.SignInvalidationRequest=[
    check('email')
    .isEmail()
    .withMessage('email is required'),
     check('hash_password')
    .isLength({ min:6 })
    .withMessage('password should contain more than 6 caracters'),
]
exports.isRequestValidated=(req,res,next)=>{
    const errors=validationResult(req)
     if(errors.array().length>0){
        return res.status(400).json({ error:errors.array()[0].msg} )
     }
     next()
}