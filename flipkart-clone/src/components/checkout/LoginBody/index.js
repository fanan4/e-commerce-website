import React, { useState } from 'react'
import './style.css'
import { login } from '../../../actions'
import { useDispatch, useSelector } from 'react-redux'
export default function LoginBody() {
  const [focus,setFocus]=useState(false)
  const [show,setShow]=useState(false)
  const [mail,setMail]=useState('')
  const [password,setPassword]=useState('')
  const dispatch=useDispatch()
 
  const LoginAction=()=>{
    const user={
      email:mail,
      hash_password:password
    }
      dispatch( login(user) )
  }
  return (
        <div className='loginBody'>
            <div className={focus?'labelFocus':'label'}>Enter Email/Mobile Number</div>
            <input 
              type="text"
                 value={mail}
                 onChange={(e)=>setMail(e.target.value)}
                 onFocus={ ()=>setFocus(true) }
                 onBlur={ ()=>setFocus(false) }
                 
              />
            <div className={show?'disappear':'paraLicense'}>By continuing, you agree to Flipkart's <span >Terms of Use </span>and<span> Privacy Policy</span></div>
            <button 
                className={show?'disappear':'Btn'}
                onClick={()=>{setShow(true)}}
                >
                    CONTINUE</button>
            <div className={ show?'LoginBtn':'disappear' }>
                <div  className={focus?'labelFocus':'label'}>Enter Password</div>
                <input type="password"
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       onFocus={ ()=>setFocus(true) }
                       onBlur={ ()=>setFocus(false) }

                /> 
                <div></div> 
                <button 
                    className='Btn'
                    onClick={ ()=>LoginAction()}
                   > 
                  LOGIN</button> 
            </div>    
        </div>
  )
}
