import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Container,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderAction } from '../../actions'
import './style.css'
import OrderStatus from './OrderStatus'
export default function Order() {
  const dispatch=useDispatch()
  const orders=useSelector(state=>state.order.orders)
  useEffect(()=>{
     dispatch( getOrderAction() ) 
  },[])
  return (
    <Layout sidBar>
          <div className='OrdersCont' >
              {
                orders &&orders.length>0 &&
                  orders.map((order,index)=>(
                     <div className='orderContainer'>
                        <div className='OrderHeader'>
                            <div className='orderId'>{order._id}</div>
                        </div>
                        <div className='orderBody'>
                            <div className='orderInfo'>
                               <div className='orderItems'>
                                   {
                                    order.items&& order.items.length>0 &&
                                      order.items.map((item,index)=>(
                                           <div className='productItem'>{item.productId.name}</div>
                                      ))
                                   }
                               </div>
                               <div className='orderTotalAmount'>{order.totalAmount}</div>
                               <div>{"pending"}</div>
                            </div>
                            <div className='orderStatus'>
                               <OrderStatus
                                 orderStatus={order.orderStatus}
                                 OrderId={ order._id }
                               />
                            </div>
                        </div>
                     </div>
                  )
                  )
              }
          </div>
    </Layout>
  )
}
