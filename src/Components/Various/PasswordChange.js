import React, {Component} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

class PasswordChange extends Component {
  // TODO plug into api
  render() {
    return (
        <Form as={Col} md={4}>
          <Form.Label as={Row} column md={12}><h3>Zmień hasło</h3></Form.Label>
            <Form.Group as={Row} controlId="formCurrentPassword">
              <Form.Label column md={5}>Obecne hasło:</Form.Label>
              <Col md={7}><Form.Control type="password" placeholder="Wpisz obecne hasło" /></Col>
            </Form.Group>
          <Form.Group as={Row} controlId="formNewPassword">
            <Form.Label column md={5}>Nowe hasło:</Form.Label>
            <Col md={7}><Form.Control type="password" placeholder="Wpisz nowe hasło" /></Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formCurrentPasswordRepeat">
            <Form.Label column md={5}>Potwórz hasło:</Form.Label>
            <Col md={7}><Form.Control type="password" placeholder="Powtórz hasło" /></Col>
          </Form.Group>
          <Button>Zmień hasło</Button>
        </Form>
    );
  }
}

export default PasswordChange;
