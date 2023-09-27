import React from 'react'
import Layout from '../../Layout'
import './style.css'
export default function PagePath(props) {
  return (
    <Layout>
        <div className='PathContainer' style={props.style}>
       <ul>
           {
            props.pathMenu && props.pathMenu.length>0 &&
             props.pathMenu.map((item,index)=>(
                      <li>
                        <a href={item.href}>
                             {item.label}
                        </a>
                        <span>{props.icon && props.icon}</span>
                      </li>
             ))

           }
       </ul>
    </div>
    </Layout>
    
  )
}
