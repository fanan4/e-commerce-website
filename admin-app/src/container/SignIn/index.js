import React, {  useState } from 'react'
import { Container,Form,Row,Col,Button } from 'react-bootstrap'
import Layout from '../../components/layout'
import Input from '../../components/UI/input'
import   { login} from '../../actions'
import { useDispatch,useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function SignIn() {
  //create all the state
 
  const [email,setEmail]=useState('');
  const [hash_password,setPassword]=useState('');
  const [error,setError]=useState('')
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth)
  const userLogin= (e)=>{
   console.log('hello in the userLogin')
     e.preventDefault();
  let user={
     email,hash_password
  }
    dispatch(login(user))
 }
    if(auth.authanticate){
        return <Navigate to={'/'}/>
    }
  console.log('execute the login again')
  return (
    <div>
      <Layout>
           <Container>
            <Row style={{ marginTop:'50px' }}>
               <Col md={{ span:6 ,offset:3 }}>
               <Form onSubmit={userLogin}>
                 <Row>
                     <Col md={12}>
                        <Input
                           Label='Email Adress'
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
                           placeholder='Password'
                           value={hash_password}
                           onChange={(e)=>setPassword(e.target.value)}
                          
                        />
                     </Col>
                 </Row>
               
               <Button variant="primary" type="submit" >
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