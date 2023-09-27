import React, { useState } from 'react'
import CategorieList from '../CategorieList'
import Header from '../Header'

import './style.css'
export default function Layout(props) {
  // const [DarkContent,setDarkContent]=useState('');
  // const CloseLogin=()=>{
  //      setDarkContent('')
  // }
  // const renderDarkView=()=>{
  //       setDarkContent( <div>
  //         <div className='DarkView' onClick={()=>setDarkContent('')}></div>
  //         <Login 
  //            CloseLogin={CloseLogin}
  //         />
  //         </div>)
  // }
 
  return (
    <div> 
     
        <Header/>
        <CategorieList/>
         {props.children}
        
    </div>
  )
}
