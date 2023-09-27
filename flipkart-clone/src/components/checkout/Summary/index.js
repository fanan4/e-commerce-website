import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import Layout from '../../Layout'
import { MaterialButton } from '../../MaterialUi'
import Card from '../../UI/Card'
import CartItem from '../../UI/CartItem'
export default function Summary(props) {

    const cart=useSelector(state=>state.cart)
  return ( 
    <div style={{ marginTop:"-23px" }} > 
           <Card
            //   CartLeft={   
            //      <div style={{fontSize:"22px",fontWeight:"500",margin:"10px"}}>
            //          My cart
            //     </div>
            //     }   
           >
                  { Object.keys(cart.cartItems).map((key,index)=>{
                     return(
                        <CartItem
                            keyItem={cart.cartItems[key]}
                        />
                     )
            })
           

         } 
          <MaterialButton
                title="Place Order"
                style={{ width:'30%',position:'relative',marginLeft:'67%',bottom:'10px' }}
                onClick= { props.onClick }
             /> 
             </Card>
            
    </div>
    
  )
}
