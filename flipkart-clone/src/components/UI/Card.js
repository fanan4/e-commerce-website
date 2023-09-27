import React from 'react'
import "./style.css"
export default function Card(props) { 
  return (
             <div className='PorductsLISTE'
            >
                        <div className= 'ProductHeader' style={props.bgColor?{backgroundColor:"blue"}:{}}>
                                { props.CartLeft && props.CartLeft }
                                { props.CartRight && props.CartRight }
                           </div>
                                  { props.children }
                        <div/>
                     </div>
  )
}
