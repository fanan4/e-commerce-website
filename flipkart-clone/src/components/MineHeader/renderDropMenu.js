import React from 'react'
import { IoMdContact,IoIosPhotos,IoIosHeart,IoMdCube,IoIosGift } from "react-icons/io";
import "./style.css"
export default function RenderDropMenu() {
  return (
    <div className='renderMenu'>
        <div className='singUp'>
             <p>New customer? </p>
             <a>sing Up</a>
        </div>
       
        <div className='userProfile'>
            
            <IoMdContact/>
            <div>My Profile</div>
            
        </div>
       
        <div className='orders'>
            <IoIosPhotos/>
            <div>Orders</div>
        </div>
        
        <div className='wishList'>
            <IoIosHeart/>
            <div>Wish List</div>
        </div>
       
        <div>
            <IoMdCube/>
            <div>Rewards</div>
        </div>
       
        <div>
            <IoIosGift/>
            <div>Gift Card</div>
        </div>
    </div>
  )
}
