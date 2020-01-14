import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import LoginDropdown from "./LoginDropdown";
import {NavItem} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import IsGuest from "../User/IsGuest";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
    }
  }

  renderGreeting() {
    if (this.state.isLogged === true) {
      return <IsGuest />;
    }
    else {
      return <IsGuest />;
    }
  }

  render() {
    return (
        <Container>
          <Navbar bg="light" expand="lg">
            <Link to='/'><Navbar.Brand>Gagoo</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to='/offers'>Przeglądaj oferty</Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Ogloszenia</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              { this.renderGreeting() }
            </Navbar.Collapse>
          </Navbar>
        </Container>
    );
  }
}

export default Navigation;
