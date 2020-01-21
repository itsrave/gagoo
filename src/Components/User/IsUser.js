import React, {Component} from 'react';
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
            <NavDropdown.Item onClick={this.props.onLogout}>Wyloguj</NavDropdown.Item>
          </NavDropdown>
        </>
    );
  }
}

export default IsUser;
