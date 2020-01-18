import React, {Component} from 'react';
import {Link} from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import PropTypes from 'prop-types'

class IsUser extends Component {
  static propTypes = {
    username: PropTypes.string
  };
  render() {
    return (
        <>
          <NavDropdown title={"Witaj, " + this.props.username} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.2">Moje ogłoszenia</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Ustawienia</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="#action/3.4">Wyloguj</NavDropdown.Item>
          </NavDropdown>
        </>
    );
  }
}

export default IsUser;
