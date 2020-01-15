import React, {Component} from 'react';
import {Col, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      token: '',
    }
  }
  onSubmit(e) {
    let user = {
      username: this.username.current.value,
      password: this.username.current.value
    };
    axios
        .post('http://127.0.0.1:8000/api/login_check', user)
        .then(res => this.setState({token: res.data.token}))
        .catch(err => console.log(err));

  }
  render() {
    return (
        <Container>
          <Form className='d-flex justify-content-sm-center'>
            <Col md={5}><Form.Group controlId="formBasicEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control type="text" name='username' ref={this.username} placeholder="Email lub nazwa użytkownika"/>
            </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" ref={this.password} name='password' placeholder="Hasło"/>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Zapamiętaj mnie"/>
              </Form.Group>
              <Button variant="primary" onClick={this.onSubmit}>
                Zaloguj
              </Button></Col>
          </Form>
        </Container>
    );
  }
}

export default LoginPage;
