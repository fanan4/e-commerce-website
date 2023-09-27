import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductAction } from '../../../actions'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './style.css'
export default function ProductStore(payload) {
    const disptach=useDispatch()
    const product=useSelector(state=>state.product)
    console.log('payload',payload)
    const { page }=product
    useEffect(()=>{
         disptach( getProductAction(payload.params))
    },[])
    console.log('productttt',page)
  return (
    <div>
       <h3
         style={{margin:'20px 20px',fontSize:'25px',lineHeight:'10px',textTransform:'uner-line'}}
       >{page.title}</h3>
       <Carousel
        renderThumbs={()=>{}}
       >
           {
           
            page.banners && page.banners.length>0?
            page.banners.map((item,index)=>(
                <div 
                   className='CarouselImage'
                   style={{border:'2px solide #858585',
                   boxShadow:'1px 1px 2px 2px  #858585'}}
                   >
                    <a
                        key={index}
                        href={item.NavigateTo}
                        style={{display:'block'}}
                    >
                        <img 
                           src={item.img}
                           style={{
                            width: '100%',
                            height:'100%'
                        }}                        
                        />
                    </a>
                   
                    
                </div>
            ))
             :null
            }
       </Carousel>
       <div
         style={{
            display:'flex',
            margin:'10px',
            justifyContent:'center',
            flexWrap:'wrap'
         }}
       >
        {
        
        //    console.log('products mapping',page.products)
        page.products && page.products.length>0? page.products.map((product,item)=>(
                <div
                   style={{
                    width:'400px',
                    height:"200px",
                    margin:'10px',
                    borderRadius:'10px',
                    border:'2px solide #858585',
                    boxShadow:'1px 1px 2px 2px  #858585'
                   }}
                >

                  <img
                    width={'100%'}
                    height={'100%'}
                    src={product.img}
                  />  
                </div>
            )):null
        } 

       </div>
    </div>
  )
}
