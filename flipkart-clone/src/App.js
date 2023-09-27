import logo from './logo.svg';
import './App.css';
import Home from './Home';
import  { BrowserRouter as Router ,Navigate,Route, Routes} from 'react-router-dom'
import ProductList from './components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isLogedIn,updatCart } from './actions'
import ProductDetail from './components/ProductDetailsPage';
import CartPage from './components/CartPage';
import Checkout from './components/checkout';
import OrderPage from './components/OrderPage';
import OrderDetails from './components/OrderDetails';
let slug=''
function App() {
   const auth=useSelector(state=>state.auth)
   const dispatch=useDispatch();
   useEffect(()=>{
      if(!auth.authanticate){
         dispatch( isLogedIn() )
      }
   },[auth.authanticate])
  useEffect(()=>{
      dispatch( updatCart() )
  },[auth.authanticate])
  return (
    <div className="App">
       <Router>          
          <Routes>
             <Route exact path='/' element={<Home/>}></Route>
             <Route exacat path='/cart' element={<CartPage/>}/>
             <Route exact path='/checkout' element={<Checkout/>}/>
             <Route exact path='/account/Order' element={<OrderPage/>}/>
             <Route exact path='/orderDetails/:orderId' element={<OrderDetails/>}/>
             <Route exact path='/:slug' element={<ProductList  />}></Route>
             <Route exact path='/:productSlug/:productId/p' element={<ProductDetail />}></Route>
             
          </Routes>
       </Router>
    </div>
  );
}

export default App;
