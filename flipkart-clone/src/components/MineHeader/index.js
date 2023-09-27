import React,{ useState } from 'react'
import './style.css'
import CategorieList from '../CategorieList'
import Login from '../Login.js'

import {
  IoMdSearch,IoIosArrowDown,IoIosArrowUp
 } from "react-icons/io"
import RenderDropMenu from './renderDropMenu'
import { IoMdArrowDropup } from 'react-icons/io'
import MoreDropDown from './rednerMoreElemt'
export default function Header(props) {
  
  return (
    <div>
        <div className='header-flipkart'>
          {/* filp-kart logo */}
         <div className='logo'>
           <img src='../../../flipkart-logo.png'/>
         </div>
          {/* filp-kart input search */}
         <div className='search'>
          
          <input
            type='text'
            placeholder='Search for products, brands and more'
          />
          
          <div className='icons'>
              <IoMdSearch />
          </div>

          </div>
          {/* filp-kart Login */}
          <div className='LoginPart'>
            <div className='Login' onClick={()=>props.renderDarkView()} > Login </div>
            <div className='dropDown'>
              <IoMdArrowDropup/>
            </div>
            <RenderDropMenu/>
          </div>
          {/* filp-kart become a seller */}
          <div className='seller'>
            Become a Seller
          </div>
          {/* filp-kart More */}
          <div className='More'>
             <div className='MoreTitle'>
               More
             <div className='dropDownIcon'>
                   <IoIosArrowDown/>
             </div>
             <div className='dropUpIcon'>
                   <IoIosArrowUp/>
             </div>
              
             </div>
             <div className='dropDown'>
              <IoMdArrowDropup/>
             
              </div>
             <MoreDropDown/>
             </div>
             
          {/* filp-kart Cart */}
          

    </div>

    </div>
  )
}
