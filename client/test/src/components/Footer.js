import React from "react";
import { Navbar } from "react-bootstrap";

function Footer() {
  return (
    <div>
      <div className="pushDown">
        <p>&nbsp;</p>
      </div>
      <Navbar className="navbar fixed-bottom navbar-light bg-light navFooter">
        
          <Navbar.Text>
            © This a test application for StageWood Recruitment Process
          </Navbar.Text>          
        

      </Navbar>
    </div>
  );
}

export default Footer;
