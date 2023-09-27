import React from 'react'
import { IoIosNotifications,IoIosTrendingUp,IoMdChatboxes } from "react-icons/io"
import "./style.css"
export default function MoreDropDown() {
  return (
    <div className='MorDropDown'>
        <div>
            <IoIosNotifications/>
           <div>Notification Prefences</div>
        </div>
        <div>
            <IoIosTrendingUp/>
           <div>Advertise  </div>
        </div>
        <div>
           <IoMdChatboxes/>
           <div>Download App</div>
        </div>
        

    </div>
  )
}
