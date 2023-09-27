import './App.css';
import  { BrowserRouter as Router ,Route, Routes} from 'react-router-dom'
import Home from './container/Home';
import SignIn from './container/SignIn';
import SignUp from './container/SignUp';
import Porduct from './container/product';
import Order from './container/order';
import Categorie from './container/Categorie';
import PrivateRoute from './HOC/privateRoute'
import { useSelector,useDispatch } from 'react-redux'
import   { isLogedIn,getInitialAction } from './actions'
import { useEffect } from 'react'

import Page from './container/newPage';
function App() {
  const auth=useSelector(state=>state.auth)
  const dispatch=useDispatch()
   useEffect(()=>{
    if(!auth.authanticate){
      dispatch( isLogedIn() );
    }
   },[])
   useEffect(()=>{
    dispatch( getInitialAction() )
   },[auth])

  return (
    <div className="App">
      <Router>
        <Routes>
          
              <Route exact path='/' element={<PrivateRoute/>}>
                     <Route exact path='/' element={<Home/>}/>
              </Route>
              <Route path='/signIn'  element={<SignIn/>} />
              <Route path='/signUp'  element={<SignUp/>} />
              <Route exact path='/' element={<PrivateRoute/>}>
                     <Route exact path='/product'  element={<Porduct/>} />
              </Route>
              <Route exact path='/' element={<PrivateRoute/>}>
                     <Route path='/newPage' element={<Page/>} />
              </Route>
              <Route exact path='/' element={<PrivateRoute/>}>
                     <Route exact path='/order'  element={<Order/>} />
              </Route>
              <Route exact path='/' element={<PrivateRoute/>}>
                     <Route exact path='/categorie'  element={<Categorie/>} />
              </Route>   
        </Routes>
      </Router>    
       
    </div>
  );
}

export default App;

