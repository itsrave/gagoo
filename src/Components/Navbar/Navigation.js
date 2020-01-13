import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import LoginDropdown from "./LoginDropdown";
import {NavItem} from "react-bootstrap";

class Navigation extends Component {
  render() {
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Gagoo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Ogloszenia</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <NavDropdown id='basic-nav-dropdown' title="Zaloguj">
              <LoginDropdown />
            </NavDropdown>
            <Nav.Link>
              Zarejestruj
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Navigation;
