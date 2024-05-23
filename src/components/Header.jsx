import React from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { authActions } from "./Store";

const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <div style={{backgroundColor:"black"}}>
      <Navbar className="bg-body-dark">
      <Container>
        <Navbar.Brand href="#home" style={{color:"white"}}>Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {!isLoggedIn && <>
          <div style={{display:"flex",flexDirection:"row",gap:"30px"}}>
          <Form className="d-flex">
          <Link to='/'> <Button variant="outline-primary" style={{color:"white"}}>Login</Button></Link>
          </Form>
          <Form className="d-flex">
          <Link to='/signup'><Button variant="outline-primary" style={{color:"white"}}>SignUp</Button></Link>
          </Form>
          </div>
          </>}
          {isLoggedIn && <>
          <Form className="d-flex">
          <Link to='/'> <Button variant="outline-primary" style={{color:"white"}} onClick={() => dispath(authActions.logout())}>Logout</Button></Link>
          </Form>
          </>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
