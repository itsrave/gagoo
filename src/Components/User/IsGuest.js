import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

class IsGuest extends Component {
  render() {
    return (
        <>
          <Nav.Link>
            <Link to='/login'>
              Zaloguj
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to='/register'>
              Zarejestruj
            </Link>
          </Nav.Link>
        </>
    );
  }
}

export default IsGuest;
