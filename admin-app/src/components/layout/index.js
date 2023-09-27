import React from 'react'
import Header from '../header'
import { Container,Row,Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './style.css'
export default function Layout(props) {
  return (
     <>
    
       <Header/>
       {
        props.sidBar?
       
         <Col md={2} className='sideBar' >  
               <ul>
                  <li className='homePage'><NavLink   to='/'>Home</NavLink></li>
                  <li className='productPage'><NavLink   to='/product'>product</NavLink></li>
                  <li className='orderPage'><NavLink   to='/order'>order</NavLink></li>
                  <li className='categoriePage'><NavLink   to='/categorie'>Categorie</NavLink></li>
                  <li className='Page'><NavLink   to='/newPage'>Page</NavLink></li>
               </ul>
          </Col>: ""
       }
        
        {props.children}
     </>
  )
}
