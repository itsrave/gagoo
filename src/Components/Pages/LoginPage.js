import React, {Component} from 'react';
import {Col, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LoginPage extends Component {
  render() {
    return (
        <Container>
          <Form className='d-flex justify-content-sm-center'>
            <Col md={5}><Form.Group controlId="formBasicEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control type="email" placeholder="Email lub nazwa użytkownika"/>
            </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło"/>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Zapamiętaj mnie"/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Zarejestruj
              </Button></Col>
          </Form>
        </Container>
    );
  }
}

export default LoginPage;
