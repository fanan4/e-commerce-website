require('dotenv').config()
const express=require('express')
const App=express()    
const connectDb=require('./db/connect')
const notFound=require('./midlllware/notFound')
const authRoute=require('./routes/admin/Users')
const errorHnadler=require('./midlllware/error-handler')
const categoriRoute=require('./routes/admin/categorie')
const productRoute=require('./routes/admin/Product')
const cartRoute=require('./routes/admin/Cart')
const initialRoute=require('./routes/admin/initialData')
const pageRoute=require('./routes/admin/Page')
const customerRoute=require('./routes/customer')
const adressRoute=require("./routes/admin/Adress")
const orderRoute=require("./routes/customer/order")
const orderAdminRoute=require("./routes/admin/Order.admin")
const cors=require('cors')

//.secret data from dotenv
const port=process.env.PORT 
const url=process.env.DB_URL 

//routes
App.use(cors())
App.use(express.json())
App.use('/api/Aorder',orderAdminRoute) 
App.use('/api/admin',authRoute); 
App.use('/api/customer',customerRoute);
App.use('/api/categorie',categoriRoute)
App.use('/api/product',productRoute)
App.use('/api/cart',cartRoute)
App.use('/api',initialRoute)
App.use('/api/page',pageRoute)
App.use('/api/adress',adressRoute)
App.use('/api/order',orderRoute)
App.use(express.static('./routes/uploads'))

App.get('/',(req,res)=>{
  res.send('hello to ecommerce app')
}) 
//midllware
App.use(errorHnadler) 
App.use(notFound)

//connect to the database and enable the app to listenn to the pore
const start= async ()=>{
   try {
     await connectDb(url)  
     App.listen(port,console.log(`the server is lestenning to the port ${port}`))
   } catch (error) {
      console.log(error) 
   }
}
start()  