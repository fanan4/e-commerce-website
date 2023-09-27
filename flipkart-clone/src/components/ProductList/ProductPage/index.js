import React, { useEffect, useState } from 'react'
import { Link, useParams,useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { productAction } from '../../../actions'
import ProductCard from '../../ProductCard';
import { generatUrlImg } from '../../../urlApi'
import './style.css'
import Card from '../../UI/Card';
export default function ProductPage(props) {
    const { slug } = useParams();
    
    const dispatch=useDispatch()
    const ProductBySlug=useSelector(state=>state.product)
    const [priceRange,setPriceRange]=useState({
        under5K:' under5K',
        under10K:' under10K',
        under20K:' under20K',
        under30K:' under30K',

    })

    useEffect(()=>{
          dispatch(productAction(slug))
    },[])
  return (
    <div>
        {
            Object.keys(ProductBySlug.productsByPrices).map((key,index)=>{
                    return(
                       <Card
                           CartLeft={priceRange[key]?<div style={{fontSize:"25px",marginTop:"5px"}}>{priceRange[key]}</div>:null}
                           CartRight={<button className="ViewAllBtn">View All</button>}
                       >
                          
                           <div className='PorductListBySlug'>
                             {
                                ProductBySlug.productsByPrices[key].map(product=>{ 
                                   return(
                                      <Link
                                       style={{display:'inline-block'}}
                                       to={`/${product.slug}/${product._id}/p`}
                                      >
                                          <ProductCard
                                              img={product.productPictures.length>0 ? generatUrlImg(product.productPictures[0].img):null}
                                              title={product.name}
                                              price={product.price}
                                     />
                                      </Link>
                                   )
                               })
                             }
                             </div>
                           <div/>
                    </Card>
                  
                     )
                  })
             }
       
          
        
       </div>
    
    
  )
}
