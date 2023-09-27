import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {addAdress} from '../../../actions'
import './style.css'
export default function AddressInput(props) {
    const [focus,setFocus]=useState(false)
    const [name,setName]=useState('')
    const [mobileNumber,setMobileNumber]=useState('')
    const [pinCode,setPinCode]=useState('')
    const [locality,setLocality]=useState('')
    const [address,setAddress]=useState('')
    const [cityDistrictTown,setCityDistrictTown]=useState('')
    const [state,setState]=useState('')
    const [landmark,setLandmark]=useState('')
    const [alternatePhone,setAlternatePhone]=useState('')
    const [addressType,setAddressType]=useState('')
    const [selectAdd,setSelectAdd]=useState({})
    const dispatch=useDispatch()
    const deliverAction=()=>{
      const payload={
            name,
            mobileNumber,
            pinCode,
            locality,
            address,
            cityDistrictTown,
            state,
            landmark,
            alternatePhone,
            addressType
      }
      setSelectAdd(payload)
         dispatch( addAdress(payload) )
         props.setDeliver(false)
         
    }
  return (
    <div className='Form'>
    <div className='Body'>
      <div>
        <div className={focus?'labelfocus':'label'}>Name</div>
        <input
          onFocus={()=>setFocus(true)}
          onBlur={()=>setFocus(false)}
          onChange={(e)=>setName(e.target.value)}
          value={name}  
        />
      </div>
      <div className={focus?'labelfocus':'label'}>
        <div>10-digit mobile number</div>
        <input
           onFocus={()=>setFocus(true)}
           onBlur={()=>setFocus(false)} 
           onChange={(e)=>setMobileNumber(e.target.value)}
           value={mobileNumber}
        />
      </div>
      <div className={focus?'labelfocus':'label'}>
        <div>Pincode</div>
        <input
          onFocus={()=>setFocus(true)}
          onBlur={()=>setFocus(false)} 
          onChange={(e)=>setPinCode(e.target.value)}
          value={pinCode}
        />
      </div>
      <div className={focus?'labelfocus':'label'}>
        <div>Locality</div>
        <input
          onFocus={()=>setFocus(true)}
          onBlur={()=>setFocus(false)} 
          onChange={(e)=>setLocality(e.target.value)}
          value={locality}
        />
      </div>
      <div>
        <div className={focus ?'labelfocus':'label'}>Address(Area and Street)</div>
        <input
          onFocus={()=>setFocus(true)}
          onBlur={()=>setFocus(false)} 
          onChange={(e)=>setAddress(e.target.value)}
          value={ address }
        />
      </div>
      <div>
        <div className={focus?'labelfocus':'label'}>City/District/Town</div>
        <input
          onFocus={()=>setFocus(true)}
          onBlur={()=>setFocus(false)} 
          onChange={(e)=>setCityDistrictTown(e.target.value)}
          value={cityDistrictTown}
        />
      </div>
      <div>
         <select>
                <option>-Select-state-</option>
           </select>
      </div>
      <div className={focus?'labelfocus':'label'}>
        <div>Landmark(Optional)</div>
        <input
           onFocus={()=>setFocus(true)}
           onBlur={()=>setFocus(false)} 
           onChange={(e)=>setLandmark(e.target.value)}
           value={landmark}
        />
      </div>
      <div className={focus?'labelfocus':'label'}>
        <div>Alternate Phone(Optional)</div>
        <input
           onFocus={()=>setFocus(true)}
           onBlur={()=>setFocus(false)} 
           onChange={(e)=>setAlternatePhone(e.target.value)}
           value={alternatePhone}
         />
      </div>
      </div> 
      <div>
        <div className='addressType'>Address Type</div>
        <input type='radio' onClick={()=>setState("home")}/>
        <label>Home</label>
        <input type='radio' onClick={()=>setState("work")} bnh />
        <label>Work</label>
      </div>
      <div className='deliverBtn'>
          <button className='deliver' onClick={()=>props.selectedAddress(selectAdd)}>SAVE AND DELIVER HERE </button>
          <button className='cancel'onClick={()=>props.setAddDetails(false)}>CANCEL</button>
      </div>
    </div>
  )
}
