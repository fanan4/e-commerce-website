import React from 'react'
import Layout from '../../components/Layout'
import ProductPage from './ProductPage'
import { useSearchParams } from 'react-router-dom';
import ProductStore from './ProductStore';
export default function ProductList() {
    const [searchParams] = useSearchParams();
    const params={
    cid:searchParams.get('cid'),
    type:searchParams.get('type')
   }
    
    let content=null
    const renderContent=()=>{
          switch(params.type){
            case 'Page':
                content= <ProductPage/>
            break;
            case 'Store':
                content=<ProductStore params={params}/>
            break;
            default: 
            content=null
            break;
          }
          return content
    }
  return (
    <Layout >
       { renderContent() }
    </Layout>
  )
}
