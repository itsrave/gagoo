import React, {Component} from 'react';
import NavDropdown from "react-bootstrap/NavDropdown";
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'

class IsUser extends Component {
  static propTypes = {
    username: PropTypes.string
  };
  render() {
    return (
        <>
          <NavDropdown title={"Witaj, " + this.props.username} id="basic-nav-dropdown">
            <LinkContainer to={`/account/myoffers`}>
              <NavDropdown.Item>Moje ogłoszenia</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to={`/account/settings`}>
              <NavDropdown.Item>Ustawienia</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider/>
            <NavDropdown.Item onClick={this.props.onLogout}>Wyloguj</NavDropdown.Item>
          </NavDropdown>
        </>
    );
  }
}

export default IsUser;
