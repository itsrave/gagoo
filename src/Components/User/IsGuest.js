import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from 'react-router-bootstrap'

class IsGuest extends Component {
  render() {
    return (
        <>
          <LinkContainer to='/login/navigation'>
            <Nav.Link>
              Zaloguj
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/register'>
            <Nav.Link>
              Zarejestruj
            </Nav.Link>
          </LinkContainer>
        </>
    );
  }
}

export default IsGuest;
