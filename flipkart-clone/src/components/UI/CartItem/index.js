import React, { useState } from 'react'
import { generatUrlImg } from "../../../urlApi"
import "./style.css"
import { AddCart,} from '../../../actions'
import { useDispatch, useSelector } from 'react-redux'
export default function CartItem(props) {
    const {
      id,
      name,
      img,
      price,
      quantity
    }=props.keyItem
   ;
    const [qtty,setQtity]=useState( quantity )
    const dispatch=useDispatch()
    // const incrementQtity=()=>{
    //     setQtity(qtty+1)
    //      if(auth.authanticate){
    //           AddCartApi({ 
    //             cartItmes:{
    //                 product:id,
    //                 price:price,
    //                 quantity:qty
    //       }  },1) 
    //      }else{
    //         AddCart({ id,name,img,price,qtty },1)
    //      }
        
    // }
    // const decrementQtity=()=>{
    //     if(qtty<=1) return 
    //     setQtity(qtty-1)
    //     if(auth.authanticate){

    //         AddCartApi({ 
    //            cartItmes:{
    //                 product:id,
    //                 price:price,
    //                 quantity:qty
    //     }  },-1) 
    //    }else{
    //        AddCart({ id,name,img,price,qtty },-1)
    //    }
        
    // }
    const incrementQtity=()=>{
         setQtity(qtty+1)
         dispatch( AddCart({ id,name,img,price,quantity },1 ) )
    }
    const decrementQtity=()=>{
         if(qtty<=1){
          return
         }
         setQtity(qtty-1)
         dispatch( AddCart(props.keyItem,-1 ) )
    }
    
  return (
    <div className='CartItemContainer'>
           <div className='ItemDetailsContainer'>
               <div className='cartItemDetails'>
                    <img src={generatUrlImg(img)}/>
                    <div className='productInfo'>
                        <div>{name}</div>
                        <div>{price}</div>
                    </div>
               </div>
               <div className='DeliveryText'>
                   Delivery in 3 - 5 days
               </div>
           </div>
           <div className='QtiteContainer'>
                <div 
                    onClick={ ()=>decrementQtity() }
                    style={{cursor:'pointer'}}
                >-</div>
                <input
                    value={ qtty } 
                    onChange={(e)=>setQtity(e.target.value)}
                />
                <div 
                      onClick={ ()=>incrementQtity() }
                      style={{cursor:'pointer'}}
                    >+</div>
                <button >SAVE FOR LATER</button>
                <button> REMOVE</button>
           </div>
    </div>
  )
}
