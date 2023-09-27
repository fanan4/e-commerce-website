import React from 'react'
import Modal from '../../../components/UI/modal'
import { Row,Col } from 'react-bootstrap'

export default function updatCategorieModal(props) {
    console.log('hi in updatCategorieModal(props)')
    const {
      show,
      handleClose,
      checkArray,
      expandArray,
      handlInputChange,
      CategorieList,
      onSubmit

    }=props
    console.log('show',show)
  return (
    <Modal
         show={show} 
         handleClose={handleClose} 
         modalTitle='Update Category'
         size='lg'
         onSubmit={ onSubmit }
      >
         <h4>checked</h4>
         {console.log('start rendering checked daata')}
         { 
            checkArray.length>0 && checkArray.map((item,index)=>{
              return(
              <Row> 
                <Col>
                <input 
                  placeholder='Category Name'
                  value={item.name}
                  onChange={(e)=>handlInputChange('name',e.target.value,index,'checked')}
                  className='form-control'
            />
                </Col>
                <Col>
                <select 
               value={ item.parentId }
            //    onChange={(e)=>setParentId(e.target.value)}
               className='form-control'
              >
                <option >select Category</option>
                 {console.log('start maping on cateogrieList')}
                  { CategorieList.map(category=>{
                      return <option key={category.value} value={category.value}>{category.name}</option>
                  }) }
            </select>
                </Col> 
                <Col>
                  <select 
                     className='form-control' 
                     value={item.type}
                     onChange={(e)=>handlInputChange('type',e.target.value,index,'checked')}
                     >
                             <option>store</option>
                             <option>Product</option>
                             <option>Page</option>
                  </select>
                </Col>
          
              </Row>
              )
            })
         } 
          <h4>expanded</h4>
          {console.log('start rendering expanded daata')}
         {
            expandArray.length>0 &&  expandArray.map((item,index)=>{
              return(
              <Row> 
                <Col>
                <input 
                  placeholder='Category Name'
                  value={item.name}
                  onChange={(e)=>handlInputChange('name',e.target.value,index,'expanded')}
                  className='form-control'
            />
                </Col>
                <Col>
                <select 
               value={ item.parentId }
            //    onChange={(e)=>setParentId(e.target.value)}
               className='form-control'
              >
                <option >select Category</option>
                  { CategorieList.map(category=>{
                      return <option key={category.value} value={category.value}>{category.name}</option>
                  }) }
            </select>
                </Col> 
                <Col>
                  <select 
                    className='form-control' 
                    value={item.type} 
                    onChange={(e)=>handlInputChange('type',e.target.value,index,'expanded')}
                    >
                             <option>select type</option>
                             <option>store</option>
                             <option>Product</option>
                             <option>Page</option>
                  </select>
                </Col>
          
              </Row>
              )
            })
         }   
      </Modal>
  )
}
