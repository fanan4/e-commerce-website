import React,{ useState } from 'react'
import { Container,Form,Row,Col,Button } from 'react-bootstrap'
import Layout from '../../components/layout'
import Input from '../../components/UI/input'
import { useDispatch,useSelector } from 'react-redux'
import { singUp } from '../../actions';
import { Navigate } from 'react-router-dom';

export default function SignUp() {
   const [firstName,setfirstName]=useState('');
   const [lastName,setlastName]=useState('');
   const [email,setEmail]=useState('');
   const [hash_password,setPassword]=useState('');
   const auth=useSelector(state=>state.auth)
   
   const dispatch=useDispatch()
   const userRegistre=(e)=>{
      e.preventDefault();
      const user={
         firstName,lastName,email,hash_password
      }
       dispatch(singUp(user))
   }
   if(auth.authanticate){
      return <Navigate to={'/'}/>
  }
  
console.log('sign out again')


  return (
    <div>
      <Layout>
           <Container>
            <Row style={{ marginTop:'50px' }}>
               <Col md={{ span:6 ,offset:3 }}>
                <Form onSubmit={userRegistre}>
                <Row>
                     <Col md={6}>
                        <Input
                           Label='First Name'
                           type='text'
                           placeholder='Enter First Name'
                           value={firstName} 
                           onChange={(e)=>setfirstName(e.target.value)}
                        />
                     </Col>
                     <Col md={6}>
                        <Input
                           Label='Last Name'
                           type='text'
                           placeholder='Enter Last Name'
                           value={lastName}
                           onChange={(e)=>setlastName(e.target.value)}
                        />
                     </Col>
                 </Row>
                 <Row>
                 <Col md={12}>
                        <Input
                           Label='Email'
                           type='email'
                           placeholder='Enter Email'
                           value={email}
                           onChange={(e)=>setEmail(e.target.value)}
                        />
                     </Col>
                 </Row>
                 <Row>
                 <Col md={12}>
                        <Input
                           Label='Password'
                           type='password'
                           placeholder='Enter Password'
                           value={hash_password}
                           onChange={(e)=>setPassword(e.target.value)}
                        />
                     </Col>
                 </Row>
               <Button variant="primary" type="submit">
                 Submit
               </Button>
          </Form>
               </Col>
            </Row>
           
           </Container>
      </Layout>
    </div>
  )
}