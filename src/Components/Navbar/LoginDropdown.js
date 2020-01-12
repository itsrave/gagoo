import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import {FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './LoginDropdown.css';

class LoginDropdown extends Component {
  render() {
    return (
        <Form>
            <Form.Control className='login' type="email" placeholder="E-mail" />
            <Form.Control className='login' type="password" placeholder="Hasło" />
            <Button className='login' variant="primary">Zaloguj</Button>
        </Form>
    );
  }
}

export default LoginDropdown;
