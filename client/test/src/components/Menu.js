import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Auth } from "../helpers"

const getNav = () => {  
  const user = Auth.checkIfUserIsLoggedIn();  
  
  if (user) {
    return (
      <Nav>
        <Nav.Link href="#">Hi there: {user.userName}</Nav.Link>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav>

    )
  } else {
    let path = window.location.pathname.split("/")[1];    
    if (path === "login") {

      return (
        <Nav>
          <Nav.Link href="/">Sign Up</Nav.Link>          
        </Nav>

      )

    } else {

      return (
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
          
        </Nav>

      )
    }


  }
}

function Menu() {

  return (
    <div>
      <Navbar className="menu fixed-top" collapseOnSelect expand="lg" bg="default" >
        <Container>
          <Navbar.Brand href="#home"><Image id="logoImage" src="/images/StageWood_logo.png" fluid /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            {getNav()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Menu;
