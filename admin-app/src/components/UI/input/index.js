import React from 'react'
import { Form } from 'react-bootstrap'

export default function Input(props) {
  let input=null
  const {
    categoryId,
    onCategoryChange,
    placeholder,
    options,
    type
  }=props
  switch(type){
    case 'select':
      input=<Form.Group className="mb-3" >
              <Form.Label>{props.Label}</Form.Label>
              
                <select
                  className='form-control'
                  value={ categoryId }
                  onChange={ onCategoryChange }
                >
                     <option>{placeholder}</option>
                     {
                        options.map(item=>(
                          <option key={item.value} value={item.value}>{item.name}</option>
                        ))
                     }
                </select>
          </Form.Group>

    break;

    default:
      input=<Form.Group className="mb-3" >
              <Form.Label>{props.Label}</Form.Label>
              <Form.Control
               type={props.type} 
               placeholder={props.placeholder}
               vlaue={props.vlaue}
               onChange={props.onChange}
               {...props}
              
                />
          </Form.Group>

  }
  return input
}
