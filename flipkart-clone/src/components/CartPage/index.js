import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import Layout from '../Layout'
import { MaterialButton } from '../MaterialUi'
import { useNavigate } from 'react-router-dom'
import TablePrice from '../UI/AddressInputs.js/tablePrice'
import Card from '../UI/Card'
import CartItem from '../UI/CartItem'
import { getCartItem } from '../../actions'
export default function CartPage() {
    const navigate=useNavigate()
    const cart=useSelector(state=>state.cart)
    const dispatch=useDispatch()
    const goToCheckout=()=>{
         navigate('/checkout')
    }
    useEffect(()=>{
          dispatch( getCartItem() )
    },[cart.cartItems])
    
  return (
    <Layout> 
      
    <div style={{display:"flex"}}> 
           <Card
              CartLeft={   
                 <div style={{fontSize:"22px",fontWeight:"500",margin:"10px"}}>
                     My cart
                </div>
                }   
           >
                  { Object.keys(cart.cartItems).map((key,index)=>{
                     return(
                        <CartItem
                            keyItem={cart.cartItems[key]}
                        />
                     )
            })
           

         } 
             </Card>
             {/* <Card
              CartLeft={
                <div style={{fontSize:"18px",marginRight:"100px"}}>
                   Price
                </div>
                  } 
                CartRight={
                    <div style={{width:"100px"}}>Price Details</div>
                 }  
             >

             </Card> */}
             <TablePrice
               style={{width:'35%',height:"100%"}}
               totalPrice={
                  Object.keys(cart.cartItems).reduce(function(totalPrice,key){
                     return totalPrice+cart.cartItems[key].quantity*cart.cartItems[key].price;
             },0)
               }
               totalQuatity={
                  Object.keys(cart.cartItems).reduce(function(qty,key){
                          return qty+cart.cartItems[key].quantity;
                  },0)
               }
             />
    </div>
    <MaterialButton
      title={"Place Order"}  
      style={{width:'30%',fontSize:'20px',marginLeft:'43.5%',marginBottom:"20px"}}
      onClick={ goToCheckout }
    />
    </Layout>
  )
}
