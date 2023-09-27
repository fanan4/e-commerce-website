import React from 'react'
import Layout from '../../components/layout'
import { Container,Row,Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './style.css'
export default function Home() {
  return (
    <div>
    <Layout sidBar>
       <Container fluid >
        <Row>
          <Col md={10} style={{ marginLeft:'auto' }}>content</Col>
        </Row>
      </Container>
    </Layout>
    </div>
  )
}
