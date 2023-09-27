import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderById } from '../../actions'
import Layout from '../Layout'
import './style.css'
export default function OrderDetails() { 
    const dispatch=useDispatch()
    const order=useSelector(stat=>stat.address.order)
    const { orderId }=useParams()
    let i=0
    useEffect(()=>{
       dispatch( getOrderById( orderId ))
    },[])
  return (
    <Layout>
    <div className='orderCont'>
         <div className='AllOrders'>
        {
            order.orderStatus && order.orderStatus.length &&
               order.orderStatus.map((order,index)=>(
                
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
        
        
    </div>
    </div>
    </Layout>
  )
}
