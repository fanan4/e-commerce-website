import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout'
import Modal from '../../components/UI/modal'
import Input from '../../components/UI/input'
import LinearCategories from '../../helper/linearCategories'
import  { CreatePage } from '../../actions'
import './style.css'

export default function Page() {
    const category=useSelector(state=>state.categorie)
    const [showPage,setShowPage]=useState(false)
    const [PageTitle,setPageTitle]=useState('') 
    const [descPage,setDescPage]=useState('')
    const [categories,setCategories]=useState([])
    const [categoryId,setCategoryId]=useState('')
    const [banners,setBanners]=useState([])
    const [products,setProducts]=useState([])
    const [type,setType]=useState('')
    const dispatch=useDispatch()
    const page=useSelector(state=>state.page)
    useEffect(()=>{
        setCategories(LinearCategories(category.categories))
    },[category])
    useEffect(()=>{
        if(!page.loading){
            setPageTitle('')
            setDescPage('')
            setBanners([])
            setProducts([])
            setCategoryId('')
        }
         if(page.loading){
            setShowPage(false)
         }
    },[page.loading])
    const submitPageData=(e)=>{
        console.log('hello in  submitPageData')
         e.preventDefault()
        const form =new FormData()
        form.append('title',PageTitle)
        form.append('descritpion',descPage)
        form.append('category',categoryId)
        form.append('type',type)
        if(banners && banners.length>0){
            banners.map(item=>{
                form.append('banners',item)
           })
        }
        if(products && products.length>0){
            products.map(item=>{
                form.append('products',item)
           })
        }
        dispatch( CreatePage(form))
        console.log(PageTitle,descPage,categoryId,type,banners,products)
       
        
    }
    const createPage=()=>{ 
        
       
        setShowPage(true)
    }
    const handlBannerImages=(e)=>{
        setBanners([
            ...banners,
            e.target.files[0]
        ])
    }
    const handlProductImages=(e)=>{
        setProducts([
            ...products,
            e.target.files[0] 
        ])
    }
    const onCategoryChange=(e)=>{
        const category=categories.find(item=>item.value==e.target.value)
        setCategoryId( e.target.value )
        setType(category.type)
    }
    const renderModalPage=()=>{
        return(
        <div>
        <Row>
        <Col  md={10} style={{ marginLeft:'auto' }}>
          <button onClick={()=>createPage()}>Create Page</button>
        </Col>
     </Row>
     <Modal
       show={ showPage }
       handleClose={()=>setShowPage(false)}
       modalTitle='Create Page'
       onSubmit={ submitPageData }
     >
        <Container>
            <Row>
                <Col>
              <input 
               className='form-control'
               value={PageTitle}
               onChange={(e)=>setPageTitle(e.target.value)}
               placeholder='Page Title'
            />
            </Col>
            <Col>
               <input 
               className='form-control'
               value={descPage}
               onChange={(e)=>setDescPage(e.target.value) }
               placeholder='Page Description'
            />
            </Col>
            </Row>
            
            <Row>
                <Col>
                
                <Input
                  type='select'
                  placeholder='Select Category'
                  onCategoryChange={ onCategoryChange }
                  categoryId={categoryId}
                  options={ categories }
                />
                </Col>
            </Row>
            <Row>
                <Col>
                  <input 
                     type='file'
                     name='banner'
                     onChange={handlBannerImages}   
                                    
                  />
                </Col>
            </Row>
            <Row>
                <Col>
                  <input 
                     type='file'
                     name='product'
                     onChange={handlProductImages}   
                                    
                  />
                </Col>
            </Row>
            
        </Container>
      
     </Modal>
     </div>
        )
    }
  return (
   <Layout sidBar>
    {
        page.loading ? <Row><Col md={10} style={{ marginLeft:'auto' }}><p >Createing page....please wait</p></Col></Row>:renderModalPage()
    }

   </Layout>
  )
}
 