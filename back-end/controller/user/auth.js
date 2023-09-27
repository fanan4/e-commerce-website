const Users=require('../../models/Users')
const { StatusCodes }=require('http-status-codes')
const { validationResult }=require('express-validator')
const signIn= (req,res)=>{
    Users.findOne({ email:req.body.email}) 
    .exec((error,user)=>{
        if( error ) {
            return res.status(StatusCodes.BAD_REQUEST).json({error})}
        if(user){
           if(user.authenticate(req.body.hash_password) && user.role==='customer'){
            const token=user.CreatJWB() 
            const { _id,firstName,lastName,userName,email,role }=user
           
            return res.status(StatusCodes.OK).json({ token, user:{
                _id,firstName,lastName,userName,email,role
            } })
           }
        }
        else{
            return res.status(StatusCodes.NOT_FOUND).send("user no found");
        }
    })
}
const signUp=async (req,res)=>{
    
     Users.findOne({ email:req.body.email })
     .exec((err,user)=>{
        if(user){
            return res.status(404).send('user already registred')
        }
       
     })
     const {
        firstName,
        lastName,
        email,
        hash_password
     }=req.body
   const _user=new Users({
       firstName,
       lastName,
       role:"customer",
       userName:Math.floor(Math.random()*1000)+1,
       email,
       hash_password
   })
   _user.save((err,data)=>{
    if(err){
        console.log(err)
        res.status(StatusCodes.BAD_REQUEST).send('something went wrong please try again')
    }
    else{
        res.status(200).json({ user:data })
    }
   })

}
const singOut=(req,res,next)=>{
    console.log('hello in the sing out ')
    res.status(200).json({ message:'logout Succefely' })

}
module.exports={ signIn,signUp,singOut }