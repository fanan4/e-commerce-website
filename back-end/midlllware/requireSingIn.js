const { StatusCodes }=require('http-status-codes')
const jwt=require('jsonwebtoken')
require('dotenv').config()
exports.requireSignIn=(req,res,next)=>{
    console.log('hello in require sign in')
    // console.log('token',req.headers.authorization)
    const tokenBearer=req.headers.authorization   
    if( !tokenBearer || !tokenBearer.startsWith('Bearer') ){
        return res.status(StatusCodes.UNAUTHORIZED).json({err:'you are not authorized '})
    }
   const token=tokenBearer.split(' ')[1]
   const decod=jwt.verify(token,process.env.SECRET)
   req.user=decod 
   next()
}
exports.adminMidllware=(req,res,next)=>{
    if(req.user.role!=='admin'){
        return res.status(StatusCodes.UNAUTHORIZED).json({err:'acces denied '})
    }
    next()
}
exports.userMidllware=(req,res,next)=>{
    if(req.user.role!=='customer'){
        return res.status(StatusCodes.UNAUTHORIZED).json({err:'acces denied '})
    }
    next()    
}