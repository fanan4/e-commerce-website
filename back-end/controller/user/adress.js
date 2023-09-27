const UserAdress=require("../../models/Address")

exports.addUserAdress=async (req,res,next)=>{
    const { payload }=req.body
      UserAdress.findOneAndUpdate({user:req.user.id},{
        "$push":{
            "address":payload
        }
          },{ new:true,upsert:true })
            .exec((error,address)=>{
               if(error) res.status(400).send(error)
               if(address){
                   res.status(200).json({ address })
               }
        })
}
exports.getUserAdress=async(req,res,next)=>{
    console.log("hello in get user adress ")
    UserAdress.findOne({user:req.user.id})
     .exec((error,address)=>{ 
        if(error) res.status(400).send(error)
        if(address){ 
            res.status(200).json( address )
        }
        else{res.status(400).send('it is not found')}
     })
}