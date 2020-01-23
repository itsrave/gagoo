import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import {Col, Container, Row} from "react-bootstrap";
import UserCard from "../Various/UserCard";
import PasswordChange from "../Various/PasswordChange";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  getUserData() {

  }

  render() {
    return (
        <Container className='my-3'>
          <Row>
          <Col md={4}>
            <UserCard />
          </Col>
          <Form as={Col} md={4}>
            <Form.Label as={Row} column md={12}><h3>Twoje dane</h3></Form.Label>
              <Form.Group as={Row} controlId="formEmail">
                <Form.Label column md={5}>Email: </Form.Label>
                <Col md={7}><Form.Control plaintext readOnly defaultValue="email@example.com"/></Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formUsername">
                <Form.Label column md={5}>Nazwa użytkownika: </Form.Label>
                <Col md={7}><Form.Control plaintext readOnly defaultValue="rave"/></Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formName">
                <Form.Label column md={5}>Imię: </Form.Label>
                <Col md={7}><Form.Control type="text" placeholder="Wpisz imię" /></Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPhone">
                <Form.Label column md={5}>Numer telefonu: </Form.Label>
                <Col md={7}><Form.Control type="tel" placeholder="Wpisz Numer telefonu" /></Col>
              </Form.Group>
          </Form>
            <PasswordChange />
          </Row>
        </Container>
    );
  }
}

export default Settings;
