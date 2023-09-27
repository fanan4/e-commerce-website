import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {updateOrder} from '../../../actions'
import './style.css'
export default function OrderStatus(props) {
  const [type,setType]=useState("")
  const dispatch=useDispatch()
    let i=0;
    const UpdateOrder=()=>{
         const payload={
          orderId:props.OrderId,
          type:type
         }
         dispatch( updateOrder(payload) )
    }
    const updateType=(type)=>{
       console.log("hello in update typpeeeeee",type)
       setType(type)
    }
  return (
    <div className='AllOrders'>
        {
            props.orderStatus && props.orderStatus.length &&
              props.orderStatus.map((order,index)=>(
          
                <div className='statusConstainer'>
                <div className='orderType'>{ order.type }</div>
                <div style={{display:'flex',position:'relative'}}>
                   <div className='point' style={{background:order.isCompleted?'rgb(29, 228, 29)':'rgb(152, 149, 149)'}}></div>
                   { i<3  &&<div className='state' style={{background:order.isCompleted?'rgb(29, 228, 29)':'rgb(152, 149, 149)'}}></div> }{ <div style={{display:'none'}}>{i=i+1}</div>}
                </div>
                <div className='orderDate'>{order.date}</div>
                <div></div>
            </div>
              ))
        }
        <select
          onChange={(e)=>setType(e.target.value)}
        >
          <option key="" value="">select a status</option>
            {
                  props.orderStatus && props.orderStatus.length &&
                  props.orderStatus.map((order,index)=>(
                            !order.isCompleted &&
                           <option key={index} value={order.type} onChange={()=>updateType(order.type)}>
                              {order.type}
                           </option>
                  ))
            }
        </select>
        <button onClick={()=>UpdateOrder()}>confirm</button>
        
    </div>
  )
}
