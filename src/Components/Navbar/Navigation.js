import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import {Link, Redirect} from "react-router-dom";
import IsGuest from "../User/IsGuest";
import IsUser from "../User/IsUser";
import axios from "axios";
import Loading from "../Various/Loading";
import { LinkContainer } from 'react-router-bootstrap'
import './Navigation.css'

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isLoading: false,
      token: this.props.token,
      username: this.getUserName()
    }
  }
  componentDidMount() {
    this.setState({ token: this.props.token })
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
      const newProps = this.props;
      if(prevProps.token !== newProps.token) {
        this.setState({ token: newProps.token })
      }
  }
  handleLogout() {
    this.props.onLogout();
    this.setState({token: '', username: '', redirect: true});
  }
  getUserName() {
    axios
        .get('https://jsonplaceholder.typicode.com/users/1')
        .then(res => this.setState({username: res.data.username}));
  }
  renderGreeting() {
    if (this.state.token !== undefined) {
      return <IsUser username={this.state.username} onLogout={() => this.handleLogout()} />;
    }
    return <IsGuest />;

  }

  render() {
    return (
        <Container>
          <Navbar bg="light" expand="lg">
            <Link to='/'><Navbar.Brand>Gagoo</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to='/offers'>
                  <Nav.Link>Przeglądaj oferty</Nav.Link>
                </LinkContainer>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Ogloszenia</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item href="#action/3.4">Aaaaa</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                { this.renderGreeting() }
                {this.state.isLoading && <Loading />}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          { this.state.redirect && <Redirect to="/" />}
        </Container>
    );
  }
}

export default Navigation;
