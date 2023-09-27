import { render } from '@testing-library/react';
import React from 'react'
import { Nav ,Navbar }  from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import { signOut } from '../../actions'
export default function Header() {
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth)
   const renderNonLogIn=()=>{
    return (
      <Nav>
       <li className='nav-item'>
           <NavLink className={'nav-link'} to='/SignIn'>Sign In</NavLink>
       </li>
       <li className='nav-item'>
       <NavLink  className={'nav-link'} to='/SignUp'>Sign Up</NavLink>
       </li>
    </Nav>
    );
   }
   const renderLoginIn=()=>{
    const logout=()=>{
      dispatch(signOut())
    }
    return (
      <Nav>
         <li  className='nav-item' >
              <span className='nav-link' onClick={logout}>SingOut</span>
         </li>
      </Nav>
    )
   }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fluid style={{ zIndex:1 }}>
     {/* <Navbar.Brand href="#home">Admin-dashboard</Navbar.Brand> */}
     <Link to='/' className='navbar-brand'>Admin-dashboard</Link>
     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
     <Navbar.Collapse id="responsive-navbar-nav">
       <Nav className="me-auto">
         {/* <Nav.Link href="#features">Features</Nav.Link>
         <Nav.Link href="#pricing">Pricing</Nav.Link> */}
         {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
           <NavDropdown.Item href="#action/3.2">
             Another action
           </NavDropdown.Item>
           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
           <NavDropdown.Divider />
           <NavDropdown.Item href="#action/3.4">
             Separated link
           </NavDropdown.Item>
         </NavDropdown> */}
       </Nav>
          { auth.authanticate ? renderLoginIn(): renderNonLogIn() }
     </Navbar.Collapse>

 </Navbar>
    </div>
  )
}
