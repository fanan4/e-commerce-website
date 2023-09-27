import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Container,Row,Col } from 'react-bootstrap'
import { addCategory,updateCategorieAcion,getCategories,deletCategoryAction } from '../../actions'
import { useDispatch,useSelector } from 'react-redux'
import  Input from '../../components/UI/input'
import AddCategory from './addCategorie'
import DeletCatoreyModal from './deletCategory'
import Modal from '../../components/UI/modal'
import CheckboxTree from 'react-checkbox-tree'
import UpdatCategorieModal from './updateCategorieModal.js'
import './style.css'
import { IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdAdd,
  IoIosTrash,
  IoIosCloudUpload

 } from "react-icons/io"
import 'react-checkbox-tree/lib/react-checkbox-tree.css'

export default function Categorie() {
  const [show, setShow] = useState(false);
  const [categoryName,setCategoryName]=useState('');
  const [parentId,setParentId]=useState('');
  const [categoryImage,setCategoryImage]=useState('');
  const dispatch=useDispatch()
  const categoryes=useSelector(state=>state.categorie);
  const [UpdateModal,setUpadatModal]=useState(false)
  const [deletModal,setDeletModal]=useState(false)
  const [checked,setChecked]=useState([])
  const [expanded,setExpanded]=useState([])
  const [checkedArray,setCheckedArray]=useState([])
  const [expandedArray,setExpandedArray]=useState([])
  const [categoryType,setCategoryType]=useState('')
  // console.log('categoriesList',categoryes.categories)
  

  const handleClose = () => {
    const form=new FormData()
       form.append('name',categoryName);
       parentId && form.append('parentId',parentId);
       form.append('categoryImage',categoryImage);
       form.append('type',categoryType)
       dispatch(addCategory(form))
      setShow(false);
  }
   
  const handleShow = () => setShow(true);

 //dispaly the categories in a checkbox tree liste
const  renderCategories=(Categories)=>{
  let myCategories=[];
  for(let category of Categories){
      myCategories.push(
        {
          value:category._id,
          label:category.name,
          children: category.children && category.children.length>0 ? renderCategories(category.children):null
        }

      )
  }
  return myCategories
}
 //create a categorie list 
    const createCategorieList=(categories,options=[])=>{
         categories.map(category=>{ 
              options.push({ value:category._id,name:category.name ,type:category.type, parentId: category.parentId && category.parentId})
              if( category.children && category.children.length>0){
                  createCategorieList(category.children,options)
              }
          })
          console.log(options)
         return options
    }
    const handleCategoryImage=(e)=>{
         setCategoryImage(e.target.files[0])
    }
    // update the categories
    const renderCheckedExpanded=()=>{
      const ArrayChecked=[]
      const ArrayExpanded=[]
      const categorieList=createCategorieList(categoryes.categories)
      checked.map((item,index)=>{
            const category=categorieList.find(_item=>_item.value==item)
            category && ArrayChecked.push(category)
      })
      expanded.map((item,index)=>{
        const _category=categorieList.find(_item=>_item.value==item)
        _category && ArrayExpanded.push(_category)
  })
      console.log('checked',checked)
      console.log('expanded',expanded)
      console.log('ArrayChecked',ArrayChecked)
      console.log('ArrayExpanded',ArrayExpanded)

      setCheckedArray(ArrayChecked)
      setExpandedArray(ArrayExpanded)
      console.log('fininish with  renderCheckedExpanded')
    }
    const updateCategorie=()=>{
      console.log('hello in updatecategorie')
      renderCheckedExpanded()
      setUpadatModal(true)
    }
    //handl input changes 
    const handlInputChange=(item,value,index,type)=>{
      console.log('hello in  handlInputChange')
        let updateCheckedArray=[]
        let updateExpandedArray=[]
        if(type=='checked'){
          console.log('start mappping checked array')
          updateCheckedArray=checkedArray.map((_item,_index)=>
          index===_index? {..._item,[item]:value}:_item
        )
        console.log('updateCheckedArray',updateCheckedArray)
           setCheckedArray(updateCheckedArray)
        }
        if(type=='expanded'){
          console.log('start mappping expandedd array')
          updateExpandedArray=expandedArray.map((_item,_index)=>
          index===_index? {..._item,[item]:value}:_item
        )
          console.log('updateExpandedArray',updateExpandedArray)
         setExpandedArray(updateExpandedArray)
        }  
    }
    const updateFormData=(e)=>{
      e.preventDefault()
      console.log('hello in update form data')
      const form=new FormData()
       checkedArray.forEach((item,index)=>{
           form.append('name',item.name)
           form.append('type',item.type)
           console.log('parentId checked',item.parentId)
           item.parentId && form.append('parentId', item.parentId && item.parentId)
           form.append('_id',item.value)
       })
        expandedArray.forEach((item,index)=>{
            form.append('name',item.name)
            form.append('type',item.type)
            console.log('parentId expanded',item.parentId)
            form.append('parentId', item.parentId ? item.parentId:'')
            form.append('_id',item.value)
        
    })
       dispatch(updateCategorieAcion(form))
       .then((result)=>{
          if(result){
             dispatch(getCategories())
          }
       })
       setUpadatModal(false)
    } 
    const handlCloseDelete=()=>{
      setDeletModal(false)
    }
    // create a function to delete the categories
    const deleteCategorie=()=>{
        //  console.log('checked deleteCategorie',checked)
        //  dispatch(deletCategoryAction(checked))
        //  .then((result)=>{
        //   if(result){
        //      dispatch(getCategories())
        //   }
        // })
       
        console.log('hello in the delete Categorie')
        renderCheckedExpanded()
        setDeletModal(true)
        
    }
    const deletCategories=()=>{
      console.log('hello in deletCategoriesssss')
      const ExpCheckData=checked.concat( expanded )
      console.log('ExpCheckData',ExpCheckData)
      dispatch(deletCategoryAction(ExpCheckData))
       .then((result)=>{
        if(result){
           dispatch(getCategories()) 
        }
      })
      setDeletModal(false)
    }
  return (
    <Layout sidBar>
       <Container fluid >
        <Row >
              <Col md={10} style={{ marginLeft:'auto'}}>
              <div style={{display:'flex' ,justifyContent:'space-between'}}>
                  <h1>Categorie</h1>
                  <div style={{display:'flex'}} className='Api-btn'>
                     <div className='actions'>Actions:</div>
                     <button onClick={handleShow}> <IoMdAdd /><span>Add Categorie</span> </button>
                     <button onClick={()=>deleteCategorie()}>< IoIosTrash/>Delete Categorie</button>
                     <button onClick={()=>updateCategorie()}>< IoIosCloudUpload />Update Categorie</button>
                  </div>
              </div>
              </Col>
        </Row>
        <Row>
          <Col md={10} style={{ marginLeft:'auto' }}>heloo
            {/* { renderCategories(categoryes.categories) } */}
            <CheckboxTree
                nodes={ renderCategories(categoryes.categories) }
                checked={ checked}
                expanded={expanded}
                onCheck={checked => setChecked( checked )}
                onExpand={expanded => setExpanded( expanded )}
                icons={{
                  check: <IoIosCheckbox/>,
                  uncheck: <IoIosCheckboxOutline/>,
                  expandClose:<IoIosArrowDown/>,
                  expandOpen:<IoIosArrowUp/>
              }}
            
            />
          </Col>
        </Row>
        <Row >
          <Col md={10} style={{ marginLeft:'auto' }}>
             
            </Col>
         
        </Row>
      </Container>
      {/* modal which handle a delete action */}
       <DeletCatoreyModal 
          show={ deletModal }
          handleClose={ ()=>setDeletModal(false) }
          onSubmit={ deletCategories }
          checkedArray={checkedArray}
       />

      {/* modal which handle an update action */}
       <UpdatCategorieModal
           show={UpdateModal}  
           handleClose={()=>setUpadatModal(false) }
           onSubmit={ updateFormData }
           checkArray={ checkedArray }
           expandArray={ expandedArray }
           handlInputChange={ handlInputChange }
           CategorieList={ createCategorieList(categoryes.categories) }
           
       />
      {/* modal which handle a Add Categorie action */}
      <AddCategory 
          show={ show }
          handleClose={ ()=>setShow(false) }
          onSubmit={ handleClose }
          createCategorieList={createCategorieList(categoryes.categories)}
          handleCategoryImage={ handleCategoryImage }
          categoryName={categoryName}
          parentId={ parentId }
          setCategoryName={setCategoryName}
          setParentId={ setParentId }
          categoryType={ categoryType }
          setCategoryType={ setCategoryType }
      />
    </Layout>
  )
}
