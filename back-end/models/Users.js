const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwb=require('jsonwebtoken')
const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:[true,'please provide the first name'],
            min:3,
            max:50,
            trim:true
        },
        lastName:{
            type:String,
            required:[true,'please provide the last name'],
            min:3,
            max:50,
            trim:true
        },
        userName:{
            type:String,
            required:[true,'please provide the user name'],
            min:3,
            max:50,
            unique:true,
            index:true,
            trim:true
        },
        email:{
            type:String,
            required:[true,'please provide the first name'],
            min:3,
            max:50,
            unique:true,
            trim:true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email',
              ],
        },
        hash_password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['customer','admin'],
            default:'admin'
        },
        contactNumber:{ 
            type:String
        },
        profileImage:{
            type:String
        }

        
    },{ timestamps:true }  
)
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.hash_password = await bcrypt.hash(this.hash_password, salt)
  })
userSchema.methods.authenticate= async function(hashpassword){
        return await bcrypt.compareSync(hashpassword,this.hash_password)
    }
userSchema.methods.CreatJWB= function(){
    return jwb.sign({ id:this._id,userName:this.userName, role:this.role },process.env.SECRET,{ expiresIn:'30d' })
}

module.exports=mongoose.model('Users',userSchema)  