import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../../ProductCard'

export default function NormalPage() {
    const products=useSelector(state=>state.product.products)
  return (
    <div className=''>
         {
            products &&products.length>0 &&
              products.map((product,index)=>(
                    <div className='ProductsCont'>
                      <ProductCard
                             img={product.productPictures.length>0 ? generatUrlImg(product.productPictures[0].img):null}
                             title={product.name}
                              price={product.price}
                          />
                    </div>
               
              )
              )
         }
    </div>
  )
}
