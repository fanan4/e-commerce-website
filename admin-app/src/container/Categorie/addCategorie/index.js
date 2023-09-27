import React from 'react'
import Modal from '../../..//components/UI/modal'
import { Row,Col } from 'react-bootstrap'
import Input from '../../../components/UI/input'
export default function AddCategory(props) {
    const {
      show,
      handleClose,
      createCategorieList,
      handleCategoryImage,
      categoryName,
      parentId,
      setCategoryName,
      setParentId,
      categoryType,
      setCategoryType,
      onSubmit
    }=props
  return (
    <Modal
       show={ show } 
       handleClose={ handleClose }  
       modalTitle='Add Category'
       onSubmit={ onSubmit }
    >
        <Row>
            <Col>
              
                 <Input 
                    placeholder='Category Name'
                    value={ categoryName }
                    onChange={(e)=>setCategoryName(e.target.value)}
                    className='form-control-sm'
      />
         </Col>   
         </Row>
         <Row>
            <Col>
           
               <select 
                     value={ parentId }
                     onChange={(e)=>setParentId(e.target.value)}
                     className='form-control-sm form-control '
                    >
                      <option >select Category</option>
                        { createCategorieList.map(category=>{
                            return <option key={category.value} value={category.value}>{category.name}</option>
                  }) }
                </select>
           </Col>
           <Col>
           <select
               value={ categoryType }
               onChange={ (e)=>setCategoryType(e.target.value) }
               className='form-control'
           >
              <option>Select Type</option>
              <option>store</option>
              <option>Product</option>
              <option>Page</option>
           </select>
           </Col>
         </Row>
             
          
           
    
 
      
      <input type='file' name='categoryImage' onChange={handleCategoryImage}/>
   
</Modal>
  )
}
