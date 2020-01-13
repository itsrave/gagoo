import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";

class RegisterPage extends Component {
  render() {
    return (
        <Container>
          <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control md={4} type="email" placeholder="Enter email"/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form></Container>
    );
  }
}

export default RegisterPage;
