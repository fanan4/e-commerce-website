const Page =require('../../models/Page')
require('dotenv').config()
exports.createPage =(req,res,next)=>{
    console.log('hello in create Page controller ')
     const { banners ,products } =req.files
    if(banners &&banners.length>0){
        req.body.banners=banners.map((banner,index)=>({
            NavigateTo:`bannerClick/?catgoryId=${req.body.category}&&type=${req.body.type}`,
            img:`${process.env.API}/${banner.filename}`,         
         }))
    }
    if(products && products.length>0){
        req.body.products=products.map((product,index)=>({
            img:`${process.env.API}/${product.filename}`,
            NavigateTo:`/bannerClick/?catgoryId=${req.body.category}&&type=${req.body.type}`
         }))
    }
    else{
        req.body.products=[]
    }
    
    req.body.createdBy=req.user.id
    Page.findOneAndUpdate({ category:req.body.category },req.body,{ new:true })
    .exec((error,page)=>{
        if(error) return res.status.json({error})
        if(page){
              res.status(200).json({ page })
        }
        else{
            const  page=new Page(req.body)
            page.save((error,page)=>{
                if(error) return res.status(400).json({ error })
                if(page){
                    res.status(200).json({ page })
                }
            })
        }
    })
    
    
    
}
exports.getPage= async(req,res,next)=>{
    console.log('hello in get Page')
    console.log('req.parms',req.params)
    const { category }=req.params
    Page.findOne({ category })
    .exec((error,page)=>{
        if(error) return res.status(400).json({ error })
        if(page) return res.status(200).json({ page })
    })
}