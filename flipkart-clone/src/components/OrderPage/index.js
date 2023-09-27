import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../actions'
import { generatUrlImg } from '../../urlApi'
import PagePath from '../UI/PagePath'
import { IoIosArrowForward } from 'react-icons/io'
import { authConstant } from '../../actions/constants'
import './style.css'
export default function OrderPage() {
    const dispatch=useDispatch()
    const orders=useSelector(state=>state.address.orders)
    const auth=useSelector(state=>state.auth)
    const pathMenu=[
      {label:"Home",href:"/"},
      {label:"Checkout",href:"/checkout"},
      {label:'orders',href:"/account/Order"}
    ]
    useEffect(()=>{
        dispatch( getOrder() )
    },[])
  return (
    <div>
      <div>
         <PagePath
           pathMenu={ pathMenu }
           icon={<IoIosArrowForward/>}
           style={{width:"400px"}}
         />
      </div>
        { auth.authanticate&& 
            orders &&orders.length>0?
            orders.map((order,index)=>(  
              <div className='Order'> 
                <div className='OrderHeader'><div>order number: {index+1}</div></div>
                {
                 order && order.items.length>0?
                    order.items.map((item,index)=>(   
                            <div className='orderContainer' >
                                 <img src={generatUrlImg(item.productId.productPictures[0].img)}/>
                                 <div>{item.productId.name}</div>
                                 <div>{item.payablePrice}</div>
                                 <div><a href={`/orderDetails/${order._id}`}>append</a></div>
                            </div>
                          )
                    )
                 :null
                 }
                </div> 
            )):null
        }
    </div>
  )
}
