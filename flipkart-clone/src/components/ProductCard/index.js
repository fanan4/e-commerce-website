import React from 'react'
import './style.css'
export default function ProductCard(props) {
  return (
    <div className='ProductCard'>
        <img src={props.img}/>
        <div className='ProductTitle'>{props.title}</div>
        <div className='ProductPrice'>₹ {props.price}</div>
    </div>
  )
}
