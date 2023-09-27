import axiosInstance from "../helper";
import store from "../store"
import { cartConstant } from "./constants";
export const AddCart=(product,qtity=1)=>{
    return async(dispatch)=>{
      console.log("helooooo in AddCarttt")
      const cartItems=store.getState().cart.cartItems;
      const auth=store.getState().auth
      const qty=cartItems[product.id]?cartItems[product.id].quantity+qtity:1
      cartItems[product.id]={
            ...product,
            quantity:qty 
      } 
        if(auth.authanticate){ 
              let payload={  
                cartItmes:{
                    product:product.id,
                    price:product.price,
                    quantity:qty
                 }  
              }
                  const res=await axiosInstance.post('/cart/create',payload)
                   if(res.status==200){
                        dispatch( getCartItem() )
              }
        }
        else{
            localStorage.setItem("cart",JSON.stringify(cartItems))
            dispatch({
                type:cartConstant.Add_To_Cart,
                payload:{
                    cartItems:cartItems
                }
            })
        } 
    }  
}
export const getCartItem=()=>{
      return async(dispatch)=>{
           const res=await axiosInstance.get("cart/getCartItem")
           if(res.status==200){
                 dispatch({
                    type:cartConstant.Add_To_Cart,
                    payload:{
                        cartItems:res.data
                    }
                 })
                 localStorage.setItem("cart",JSON.stringify(store.getState().cart.cartItems))
           }
      }
}
export const updatCart=()=>{

      const auth=store.getState().auth
      const cartItem=localStorage.getItem("cart")&&JSON.parse(localStorage.getItem("cart"))
      return async(dispatch)=>{
        if(auth.authanticate){
          //you got to fix that in the back end
            if(cartItem){
              Object.keys(cartItem).map.length>0&&
              Object.keys(cartItem).map(async(key,index)=>{
                   await axiosInstance.post("/cart/create",{
                    cartItmes:{
                       product:cartItem[key].id,
                       price:cartItem[key].price,
                       quantity:cartItem[key].quantity
                  }  
                  })
              })
            }
            
            dispatch( getCartItem() )
            localStorage.removeItem("cart")
            localStorage.setItem("cart",JSON.stringify(store.getState().cart.cartItems))

        } else{
          if(cartItem){
              dispatch({
                type:cartConstant.Add_To_Cart,
                payload:{
                    cartItems:cartItem
                }
              })
          }
        }
      }
      
}
// const createCartItem=async(carIstem)=>{
//     console.log("cartitemm arrayyyyyyyyyy",carItem)
//     let newCartItem={}
//     if(carItem){
//         carItem.map( async(item,key)=>{
//                  const res=await axiosInstance(`/product/ProductById/${item.product}`)
//                  console.log("producttttttttt back endddd",res.data.product)
//                  if(res.status==200){
//                      let product=res.data.product
//                          newCartItem[product._id]={
//                          id:product._id,
//                          name:product.name,
//                          qty:item.quantity,
//                          img:product.productPictures&&product.productPictures.length >0 ?product.productPictures[0].img:null,
//                          price:product.price
//                      }
//                  }
           
//          })
//     }
//     console.log("the newwwwww cart issssss",newCartItem)
//     return newCartItem
// }
// export const AddCartApi=(cartItem,qtity=null)=>{ 
//         console.log("hello in add Cart Apiiiiiiiii")
//         let newQtity
//         if(qtity==null){
//            newQtity=cartItem.cartItmes.quantity;
//         } else {
//            newQtity=qtity
//         }
//       return async(dispatch)=>{
//           const res=await axiosInstance.post("/cart/create",{
//             ...cartItem,
//              quantity:newQtity
//           })
//           console.log("ressssssss dot statussssssssss",res.data)
//           if(res.status==200){
//                //const productResult=await axiosInstance(`/product/${}`)
//                let _cart= await createCartItem(res.data._cart.cartItmes)
//                if(_cart){
//                    console.log("____________________cart --- is",_cart)
//                    localStorage.setItem("cart",JSON.stringify( _cart ))
//                 dispatch({
//                    type:cartConstant.Add_To_Cart,
//                    payload:{
//                     cartItems:_cart
//                   }
//               })
//                  return true
//                }
              
//           }
          
//       }

// }