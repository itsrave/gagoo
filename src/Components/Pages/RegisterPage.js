import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col, Container} from "react-bootstrap";

class RegisterPage extends Component {
  render() {
    return (
        <Container>
          <Form className='d-flex justify-content-sm-center'>
            <Col md={5}><Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email"/>
            </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nazwa użytkownika</Form.Label>
                <Form.Control type="email" placeholder="Nazwa użytkownika"/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło"/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control type="password" placeholder="Powtórz hasło"/>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Akceptuje regulamin serwisu"/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Zarejestruj
              </Button></Col>
          </Form>
        </Container>
    );
  }
}

export default RegisterPage;
