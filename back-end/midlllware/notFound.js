const { StatusCodes } = require('http-status-codes')
const notFound=(req,res,next)=>{
    res.status(StatusCodes.NOT_FOUND).send('route does not exits')
}
module.exports=notFound