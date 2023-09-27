import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress } from '../../../actions'
import { IoIosRadioButtonOff,IoIosRadioButtonOn } from "react-icons/io";
import AddressInput from '../../UI/AddressInputs.js';
import './style.css'
import { IoIosAdd } from "react-icons/io";
export default function AddressBody(props) {
    const dispatch=useDispatch()
    const address=useSelector( state=>state.address  )
    const [addDetails,setAddDetails]=useState(false)
    const [choose,setChoose]=useState(true)
    const [rink,setRink]=useState(0)
    useEffect(()=>{
      dispatch( getAddress() )
    },[])
    const setShow=(value)=>{
            setRink(value)
            // setChoose(show)
    }
    const showAddAdress=(value,id)=>{
        setRink(id)
        setAddDetails(value)
    }
   
    const selectedAddress=(addr)=>{
      props.setDeliver(false)
      props.setSelecteAdd(addr)
    } 
  return (
    <div>
        <div>
          { address.addressItems && address.addressItems.length>0?
                 address.addressItems.map((item,index)=>{ 
                    return(
                        <div className='addDetails' style={rink==index?{backgroundColor:"#e3ecfa"}:{}}>
                        {
                          addDetails && rink==index?
                           <AddressInput
                               setAddDetails={ setAddDetails }
                               setDeliver={ selectedAddress }
                           />:  
                          <div className='addDetBody'>
                              <div className='userInfo'> 

                                   {   rink==index? <div className='on' onClick={()=>setShow(index)}><IoIosRadioButtonOn/></div>:
                                                              <div className='off' onClick={()=>setShow(index)}><IoIosRadioButtonOff/></div>
                                               
                                   }
                                   <div className='userInfoDet'>{item.name}  {item.mobileNumber}</div>
                                   {  rink==index ?<div className='edit' onClick={()=>showAddAdress(true,index)}>EDIT</div>:null }
                                 
                              </div>
                              <div style={{ marginLeft:'30px' }}>
                                 <div className='userAddress'> { item.address }
                                 </div>
                                 <div > 
                                    {  rink==index ?<button className='DeliverBtn' onClick={()=>selectedAddress(item)}>DELIVER HERE</button>:null }
                                 </div> 
                              </div>
                          </div>
                         
                        }
      
                      </div>
                    )
                 })
                :null
             }

        </div>
            {
                addDetails && rink==100?<div style={{width:"97.5%",marginLeft:"10px"}}><AddressInput setAddDetails={ setAddDetails }
                setDeliver={ props.setDeliver }/></div>:
                <div className='addNewAdress' onClick={ ()=>showAddAdress(true,100)}>
                    <IoIosAdd/>
                    <div>Add a new Address</div> 
                </div>
            }
    </div>
  )
}
