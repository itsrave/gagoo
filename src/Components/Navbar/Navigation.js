import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {Link, Redirect} from "react-router-dom";
import IsGuest from "../User/IsGuest";
import IsUser from "../User/IsUser";
import Loading from "../Various/Loading";
import {LinkContainer} from 'react-router-bootstrap'
import '../Css/Navigation.css'
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isLoading: false,
      isAdmin: false,
    }
  }
  getInitialState() {
    this.setState({
      redirect: false,
      isLoading: false,
      isAdmin: false,
    })
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userData !== this.props.userData) {
      try {
        let bool = this.props.userData.roles.includes("ROLE_MODERATOR");
        this.setState({isAdmin: bool})
      } catch (e) {
      }
    }
  }
  handleLogout() {
    this.getInitialState();
    this.setState({redirect: true});
    this.props.onLogout();
  }
  renderGreeting() {
    if (this.props.token !== undefined) {
      return <IsUser username={this.props.userData.username} onLogout={() => this.handleLogout()} />;
    }
    return <IsGuest />;
  }

  render() {
    return (
      <Container>
        <Navbar bg="light" expand="lg">
          <Link to='/'>
            <Navbar.Brand>
              <img src={require('../../img/gagoo-logo.png')} alt="Logo serwisu" />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to='/offers/date/asc/1'>
                <Nav.Link active={false}>Przeglądaj oferty</Nav.Link>
              </LinkContainer>
              {this.state.isAdmin &&
              <LinkContainer to='/adminpanel/1'>
                <Nav.Link active={false}>Panel Administatora</Nav.Link>
              </LinkContainer>
              }
            </Nav>
            <Nav>
              <LinkContainer to='/addoffer'>
                <Nav.Link><Button variant="primary">
                  <FontAwesomeIcon icon={faPlusSquare} />  Dodaj ogłoszenie
                </Button></Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              { this.renderGreeting() }
              {this.state.isLoading && <Loading />}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.redirect && <Redirect to="/" />}
      </Container>
    );
  }
}

export default Navigation;
