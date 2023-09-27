import React from 'react'
import  Modal from '../../..//components/UI/modal'
import { Row,Col } from 'react-bootstrap'

export default function DeletCatoreyModal(props) {
    console.log('hi in DeletCatoreyModal(props)')
    const {
        show,
        handleClose,
        checkedArray,
        onSubmit
    }=props
  return (
    <Modal
        show={ show } 
        handleClose={handleClose}
        modalTitle='delete Category'
        size='lg'
        onSubmit={ onSubmit }
        buttons={
          [
            {
              label:'yes',
              color:'primary',
              onClick:onSubmit
            },
            {
              label:'No',
              color:'danger',
              onClick:handleClose
            }
          ]
        }
      >
        {console.log('checked if delete')}
         <h3>Checked</h3>
          {
            checkedArray.length>0 && checkedArray.map((item,index)=>{
               return(
                  <p>{item.name}</p>
               )
            })
          }
          
      </Modal>
  )
}
