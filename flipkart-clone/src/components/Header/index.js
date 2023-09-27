import React, { useEffect, useState } from 'react';
import './style.css';
import flipkartLogo from '../images/logo/flipkart.png';
import goldenStar from '../images/logo/golden-star.jpg';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { getCartItem, login,signOut } from '../../actions'
import { 
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUi';
import { useDispatch, useSelector } from 'react-redux';
import {  Navigate, useNavigate } from 'react-router-dom';

/**
* @author
* @function Header
**/ 

const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [hash_password, setPassword] = useState('');
  const auth=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const nagivate=useNavigate();
  const onClickSubmit=()=>{
       console.log("onClickSubmit ")
        dispatch( login({ email,hash_password }));
        
  }
  useEffect(()=>{
      if(auth.authanticate){
        setLoginModal(false);
        setEmail('')
        setPassword('')
      }
  },[auth.authanticate])
  const logOut=()=>{
    console.log("hello in logout fonctionnnnnnnnnn")
      dispatch( signOut() )
  }
  
  const renderLogInMenu=()=>{
      return(
        <DropdownMenu
            menu={
              <a className="firstItem" >
                {auth.user && auth.user.firstName }
              </a>
            }
            menus={[
              { label: 'My Profile', href: '', icon: null },
              { label: 'SuperCoin Zone',href:'',icon:null},
              { label: 'Flipkart Plus Zone', href: '', icon: null },
              { label: 'Orders', href: '/account/order', icon: null,onClick:()=>{  nagivate("/account/order")} },
              { label: 'Wishlist', href: '', icon: null },
              { label: 'My Chats',href:'',icon:null},
              { label: 'Coupons',href:'',icon:null},
              { label: 'Rewards', href: '', icon: null },
              { label: 'Notifications',href:'',icon:null},
              { label: 'Gift Cards', href: '', icon: null },
              { label:  'Logout',href:'',icon:null,onClick:logOut}
            ]}
            firstMenu={
              <div className="firstmenu">
                <span>New Customer?</span>
                <a style={{ color: '#2874f0' }}>Sign Up</a>
              </div>
            }
          />
      )
  }
        
  
  const renderNoLogInMenu=()=>{
         return(
          <DropdownMenu
            menu={
              <a className="loginButton" onClick={() => setLoginModal(true)}>
                Login
              </a>
            }
            menus={[
              { label: 'My Profile', href: '', icon: null },
              { label: 'Flipkart Plus Zone', href: '', icon: null },
              { label: 'Orders', href: '', icon: null,onClick:()=>{if(!auth.authanticate){ setLoginModal(true)}} },
              { label: 'Wishlist', href: '', icon: null },
              { label: 'Rewards', href: '', icon: null },
              { label: 'Gift Cards', href: '', icon: null },
            ]}
            firstMenu={
              <div className="firstmenu">
                <span>New Customer?</span>
                <a style={{ color: '#2874f0' }}>Sign Up</a>
              </div>
            }
          />
         )
  }

  return (
    <div className="header">
      <Modal 
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">


                <MaterialInput 
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MaterialInput 
                  type="password"
                  label="Enter Password"
                  value={hash_password} 
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton 
                  title="Login"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  onClick={ ()=>onClickSubmit() }
                />
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        <div className="rightMenu">
             { 
                     auth.authanticate? renderLogInMenu():renderNoLogInMenu()
                   }
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div onClick={()=>{  dispatch(getCartItem());nagivate("/cart")}} style={{cursor:"pointer"}}>
            <a className="cart">
              <IoIosCart />
              <span style={{ margin: '0 10px' }}>Cart</span>
              
            </a>
          </div>
        </div>

      </div>
    </div>
  )

}

export default Header