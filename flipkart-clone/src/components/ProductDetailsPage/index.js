import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams,useNavigate } from 'react-router-dom'
import { AddCart, getProductById } from '../../actions'
import { generatUrlImg } from '../../urlApi'
import { MaterialButton } from '../MaterialUi'
import { IoIosFlash,IoMdCart,IoIosArrowForward,IoIosStar} from 'react-icons/io'
import Layout from '../Layout'
import './style.css'
import store from '../../store';
export default function ProductDetail(props) {
    const { productId }=useParams()
    const dispatch=useDispatch()
    const product=useSelector(state=>state.product)
    const auth=useSelector(state=>state.auth)
    let cart=useSelector(state=>state.cart)
    const nagivate=useNavigate()
    const payload={
        params:{
            productId:productId
        }
    }
   
    useEffect(()=>{
         dispatch(getProductById(payload))
    },[])
    useEffect(()=>{
          cart=store.getState().cart.cartItems
    },cart.cartItems)
    console.log("the product commingg ProductDetail",product.productDetails)
    const  GotoCartBtn=()=>{
      console.log("helloooooooooo  go to page get clicked")
        dispatch( AddCart ({
          id:product.productDetails._id,
          name:product.productDetails.name,
          quantity:product.productDetails.quantity,
          img:product.productDetails.productPictures[0].img,
          price:product.productDetails.price
     }))
     nagivate("/cart")
    }
  return (
     <Layout>
       <div className='productDetails'>
          <div className='ProductImageDescription'>
              <div className='verticalListProcutImges'>
                  { product.productDetails.productPictures&&product.productDetails.productPictures.length>0?
                     product.productDetails.productPictures.map((item,key)=>{
                        return(
                           <div className='ImageContainer'>
                               <img src={generatUrlImg(item.img)}/>
                           </div> 
                        )
                    }):null
                }
             </div>

             <div className='MainImage'>
                  <img src={ generatUrlImg(product.productDetails.productPictures&&product.productDetails.productPictures.length>0 && product.productDetails.productPictures[0].img)}/>
                   <div  className='buttons' style={{ display:'flex',marginTop:"15px" }}>
                       <MaterialButton
                            style={{ marginRight:'10px', width:"49%" }}
                            title="Go To Cart"
                            icon={<IoMdCart style={{fontSize:"20px", marginRight:"10px"}}/>}
                            onClick={()=>GotoCartBtn()
                            }       
                            />
                           
                       <MaterialButton
                           style={{ width:"49%"}}
                           title="Buy Now "
                           icon={<IoIosFlash style={{fontSize:"20px", marginRight:"10px" }}/>}
                           />
                   </div> 
             </div>
        </div>

        <div className='ProductDescription'>
          <div className="breed">
             <ul>
                 <li><a href="#">Home</a><IoIosArrowForward /></li>
                 <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
                 <li><a href="#">Samsung</a><IoIosArrowForward /></li>
                 <li><a href="#">{product.productDetails.name}</a></li>
             </ul>
             <div className='ProductData'>
                <div className='ProductTitle' >  
                   {product.productDetails.name}
                 </div>
                <div className='poductSmallDetails'>
                     <span className="ratingCount">4.3 <IoIosStar /></span>
                     <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
                     <div  className="price">
                         <span>₹{product.productDetails.price}</span>
                     </div>
                     <div>
             <div 
               style={{
                marginTop:"10px"
               }}
             >       
                  <div style={{ 
                    color: '#212121', 
                    fontSize: '16px',
                    fontWeight: '600' 
                    }}>Available Offers</div>
                  <div style={{ display: 'flex',marginTop:"10px" }}>
                    <span style={{
                      width: '100px',
                      fontSize: '14px',
                      color: '#878787',
                      fontWeight: '600', 
                      
                  }}>Description:</span>
                  <span style={{
                    fontSize: '13px',
                    color: '#212121',
                    marginLeft:"-15px"
                  }}>{product.productDetails.description}</span>
                  </div>
              </div>
          </div>
          

                  </div>
                 
                </div>
             
            
          </div>
          

      </div>
      
    </div>
    </Layout>
  )
}
