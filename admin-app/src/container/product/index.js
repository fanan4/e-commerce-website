import React,{useState} from 'react'
import Layout from '../../components/layout'
import { Container,Col,Row,Table } from 'react-bootstrap'
import  Input from '../../components/UI/input'
import { useSelector,useDispatch } from 'react-redux'
import { addPorductAction } from '../../actions'
import Modal from '../../components/UI/modal'
import { generatUrlImg } from '../../urlApi'
import './style.css'
export default function Porduct() {
  //define the states and the all the other variables
  const [show, setShow] = useState(false);
  const [name,setProductName]=useState('')
  const [quantity,setQuantity]=useState('')
  const [description,setDescription]=useState('')
  const [categorie,setCategoryId]=useState('')
  const [price,setPrice]=useState('')
  const [productPictures,setProductPictures]=useState([])
  const dispatch=useDispatch()
  const categoryes=useSelector(state=>state.categorie);
  const products=useSelector(state=>state.product)
  const [showProductDetails,setProductDetailShow]=useState(false)
  const [productDetail,setProductDetail]=useState(null)
  
  // console.log('the product list :',products)
  // console.log('categoriesList',categoryes.categories)

  //handle close button of the Modal Add Product 
  const handleClose = () => {
    const form=new FormData()
       form.append('name',name);
       form.append('quantity',quantity);
       form.append('description',description);
       form.append('categorie',categorie);
       form.append('price',price);
       for(let pic of productPictures){
        form.append('productPictures',pic);  
       }
       
      dispatch(addPorductAction(form))
      setProductName('')
      setProductPictures([])
 
      setShow(false);
  }
  const handleShow = () => setShow(true);
  //in case there is pictures 
  const handleProductPictures=(e)=>{
    //console.log("hello in handleProductPictures")
    //console.log('target.files',e.target.files[0])
    setProductPictures([
      ...productPictures,
      e.target.files[0]
     ]);  
  } 

  //in order to dispaly a group of li which contains the categories options 
  const createCategorieList=(categories,options=[])=>{
    categories.map(category=>{ 
         options.push({ value:category._id,name:category.name })
         if(category.children){
           createCategorieList(category.children,options)
           //this will make a recursion to repeat the exact same process
         }
     }) 
    //  console.log(options)
     
    return options
}
//handel product Details Close 
   const  handleProductDetailsClose=()=>{
         setProductDetailShow(false)
   }
//handle ShowPorduct Detail
   const handleShowPorductDetail=(product)=>{
        // console.log(product)
        setProductDetail(product)
        setProductDetailShow(true)
   }
   //renderModalProductDatail
   const renderModalProductDatail=()=>{
    if(!productDetail){
      return null
    }
    return (
      <Modal
         show={ showProductDetails }
         handleClose={ handleProductDetailsClose }
         modalTitle='Product Details'
         size='lg'
         className='productDetailsModal'
      >
         <Row>
            <Col md='6'>
              <label className='key'>Name</label>
              <p className='value'>{ productDetail.name }</p>
            </Col>
            <Col md='6'>
              <label className='key'>Price</label>
              <p className='value'>{ productDetail.price }</p>
            </Col>
         </Row>
         <Row>
            <Col md='6'>
              <label className='key'>Quantity</label>
              <p className='value'>{ productDetail.quantity }</p>
            </Col>
            <Col md='6'>
              <label className='key'>Category</label>
              <p className='value'>{ productDetail.categorie }</p>
            </Col>
         </Row>
         <Row>
            <Col md='12'>
              <label className='key'>Description</label>
              <p className='value'>{ productDetail.description }</p>            
              </Col>
         </Row>
         <Row>
            <Col>
               <label className='key'>Product Pictures</label>
               <div display='flex'>
                  {
                    productDetail.productPictures.map(product=>{
                      return <div  className='productPictur'>
                        <img src={ generatUrlImg(product.img)}/>
                      </div>
                    })
                  }
               </div>
            </Col>
         </Row>
      </Modal>
    )
   }
      return (
        <Layout sidBar>
        <Container fluid >
          <Row>
              <Col md={10} style={{ marginLeft:'auto'}}>
                    <div style={{display:'flex' ,justifyContent:'space-between'}}>
                        <h1>Product</h1>
                        <button onClick={ handleShow }> Add Product</button>  
                    </div>
              </Col>
          </Row>
          <Row>
            <Col md={10} style={{ marginLeft:'auto'}}>
          <Table responsive="sm" style={{fontSize:'12'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
            {
              products.products.map(product=>{
                return (
                  <tr onClick={ ()=>handleShowPorductDetail(product) } >
                      <td>#</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.categorie}</td>
                      <td>{product.quantity}</td>
                  </tr>
                )
              })
            }
          
        </tbody>
        </Table>
        </Col>
          </Row>
        
              <Modal
                 show={show}
                 handleClose={()=> setShow(false) }
                 onSubmit={  handleClose }
                 modalTitle='add Product'
              >
                  <Input
                           Label='Product Name'
                           placeholder='Product Name'
                           value={name}
                           onChange={(e)=>setProductName(e.target.value)}
                        />
                        
                        <Input
                           Label='Quantity'
                           placeholder='Quantity'
                           value={quantity}
                           onChange={(e)=>setQuantity(e.target.value)}
                        />
                        <Input
                           Label='Price'
                           placeholder='Price'
                           value={price}
                           onChange={(e)=>setPrice(e.target.value)}
                        />
                        <Input
                           Label='Description'
                           placeholder='Descrption'
                           value={description}
                           onChange={(e)=>setDescription(e.target.value)}
                        />
                       <select
                          value={categorie}
                          onChange={(e)=>setCategoryId(e.target.value)}
                          className='form-control'
                       >
                          <option>
                            select Option
                            </option>
                           {
                           createCategorieList(categoryes.categories).map(cat=>{
                            return <option value={cat.value} key={cat.value}>{cat.name}</option>
                           })}
                       </select>
                         { productPictures.map(product=>{
                              return <div>{product.name}</div>
                         }) }
                       <input type='file' name='productPictures' onChange={handleProductPictures}/>
              </Modal>
              {renderModalProductDatail()}
              
       </Container>
     </Layout>
      )
}
