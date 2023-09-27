import React from 'react'
import './style.css'
export default function TablePrice(props) {
  return (
    <div  style={props.style} className="tabPricecont">
      <div className='tableHeader'>
           Tabel Price 
      </div>
      
        <div>total quantity: {props.totalQuatity}</div>
        <div>Delivery charge: Free</div>
        <div>total price: {props.totalPrice}</div>
    </div>
  )
}
