import { Modal,Button } from 'react-bootstrap'

export default function modal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} size={props.size}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.children}
        </Modal.Body>
        <Modal.Footer>
          {
            props.buttons && props.buttons.length>0 ?''
            :<Button
               variant="primary" 
               onClick={ props.onSubmit }
               className='btn-sm'
               style={{ backgroundColor:'#404142',color:'white' }}
               >
                Save Changes
            </Button>
          
          }
          {/* <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button> */}
          {
            props.buttons && props.buttons.length>0?
                props.buttons.map((item)=>{
                  return (
                    <Button variant={item.color} onClick={item.onClick}>
                        {item.label}
                    </Button>
                  )
                })
            :''
          }
        </Modal.Footer>
      </Modal>
  )
}
