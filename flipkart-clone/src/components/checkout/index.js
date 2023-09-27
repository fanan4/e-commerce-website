import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../Layout'
import Card from '../UI/Card'
import LoginBody from './LoginBody'
import './style.css'
import { IoIosCheckmark } from "react-icons/io";
import AddressBody from './AdrressBody'
import AddressInput from '../UI/AddressInputs.js'
import Summary from './Summary'
import { addOrder } from '../../actions'
export default function Checkout() {
    const [headerCart,setHeaderCart]=useState(true)
    const auth=useSelector(state=>state.auth)
    const [deliver,setDeliver]=useState(true)
    const [selectAddress,setSelectAddress]=useState({})
    const [OrderPlaced,setOrderPlaced]=useState(true)
    const cart=useSelector(state=>state.cart)
    const dispatch=useDispatch()
    let props,info={}
    useEffect(()=>{
        if(auth.authanticate){
            setHeaderCart(false)
        }
        else{
            setHeaderCart(true)
            setDeliver(true)
        }
         
    },[auth.authanticate]) 
    const renderHeaderData=(props)=>{
        return(
        <div  style={{ width:"100%" }}>
              {
                 props.inactive?
               <div style={{ display:'flex',padding:'10px' }}>
                   <div style={{backgroundColor:'#d8e0e8',padding:'3px 10px',fontSize:'20px'}}>{props.Number}</div>
                   <div style={{marginLeft:"15px",fontSize:'22px' }}>{props.title}</div>
               </div>: props.activeStart ?
                 <div style={{ display:'flex',padding:"5px 10px" }} className="showHeader">
                    <div style={{backgroundColor:"#e8f1fa",padding:"3px 10px",marginTop:"3px"}}>{ props.Number }</div>
                    <div style={{marginLeft:"15px",fontSize:"22px",color:"white",fontWeight:"500"}}>{ props.title }</div>
                    
                 </div>: props.body
              }
                
             </div>
        )
    }
    const PlaceOrder=()=>{
         const payload={
            addressId: selectAddress._id,
            totalAmount:
               Object.keys(cart.cartItems).reduce(function(qty,key){
                       return qty+cart.cartItems[key].quantity;
               },0)
            , 
            items:Object.keys(cart.cartItems).map((key,index)=>{ 
               return (
                  {
                     productId:cart.cartItems[key].id,
                     payablePrice:cart.cartItems[key].price,
                     purchasedQty:cart.cartItems[key].quantity 
                  }
               )
            }),
            paymentStatus:"pending",
            paymentType:"card",
            orderStatus:[
               {
                  type:"ordered",
                  date:new Date(),
                  isCompleted:false
               },
               {
                  type:"packed",
                  date:new Date(),
                  isCompleted:false
               },
               {
                  type:"shipped",
                  date:new Date(),
                  isCompleted:false 
               },
               {
                  type:"delivered",
                  date:new Date(),
                  isCompleted:false
               }
            ]
         }
         dispatch( addOrder(payload) )
         localStorage.removeItem("cart")
         setOrderPlaced(false)
    }
    const loginHeaderBody=(info)=>{
      return(
      <div style={{display:"flex", padding:"15px"}}>
        <div style={{ fontSize:"25px",marginTop:"0px" }}>{info.Number}</div>
         <div style={{marginLeft:"20px"}}>
         <div style={{fontSize:"22px"}}>{info.title} <IoIosCheckmark/></div>
         { auth.user? <div>{info.details}</div>:null }
        
        </div>
        <button style={{marginLeft:"auto",padding:"0 20px"}}>CHANGE</button>
   </div>)
    }
    
  return (
    <Layout>
    <div>
        <div style={{ width:"60%",margin:"20px 3.5%" }}>
        <Card
           CartLeft={renderHeaderData(
            props={
                inactive:false,
                activeStart:!auth.authanticate,
                body:loginHeaderBody(
                   info={
                      Number:1,
                      title:"LOGIN",
                      details: `${auth.user.name} ${auth.user.email}`
                   }
                ),
                Number:1,
                title:"LOGIN"

            } 
              ) } 
        />
             {auth.authanticate?'': <LoginBody />}
             
        <Card
          CartLeft={   
            renderHeaderData(
               props={
                  inactive:auth.authanticate && deliver,
                  Number:2,
                  title:"Delivery Address",
                  activeStart: deliver && auth.authanticate,
                  body:loginHeaderBody(
                     info={
                        Number:2,
                        title:"Delivery Address",
                        details: `${selectAddress.address}`
                     }
                  )
               }
            )   
          }
        />
            {auth.authanticate && deliver ?<AddressBody
                 setDeliver={ setDeliver }
                 setSelecteAdd={ setSelectAddress}
            />:null}
            

        <Card
          CartLeft={
                 renderHeaderData(
                  props={
                     inactive:deliver,
                     Number:2,
                     title:"Delivery Address",
                     activeStart:  OrderPlaced,
                     body:loginHeaderBody(
                        info={
                           Number:3,
                           title:"Order Items",
                           details: "number of items"
                        }
                     )
                  }
                 )
             }
        />
           { !deliver&& auth.authanticate && OrderPlaced ?<Summary onClick={PlaceOrder} />:null }
        <Card
           CartLeft={      
            false ?renderHeaderData({order:4,name:'PAYMENT OPTION'},{order:4,name:"PAYMENT OPTION"},true):
           <div style={{ display:'flex',padding:'10px' }}>
              <div style={{backgroundColor:'#d8e0e8',padding:'3px 10px',fontSize:'20px'}}>4</div>
              <div style={{marginLeft:"15px",fontSize:'22px' }}>PAYMENT OPTION</div>
           </div> }
        />
    </div>
    </div>
    </Layout>
  )
}
