import React from 'react'
import "./style.css"
import { IoMdClose }from 'react-icons/io'
export default function Login(props) {
  return (
    <div className='LoginView'>
      
          <div className='DesingPart'>
            <img src="../../../Flipkart_login_page.png" />
          </div>
           <div className='LogicPart'>
              <div>Enter Email/Mobile number</div>
              <input type="text" />
              <div>Enter Password</div>
              <input type="password" /> 
              <p>By continuing, you agree to Flipkart's 
                <span>Terms of Use</span> and <span>Privacy Policy</span>.
              </p> 
              <button>Login</button> 
            </div>
            <div onClick={()=>props.CloseLogin()}><IoMdClose/></div>
          
    </div>
  )
}
