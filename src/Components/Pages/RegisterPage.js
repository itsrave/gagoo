import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col, Container} from "react-bootstrap";
import Loading from "../Various/Loading";
import Alert from "react-bootstrap/Alert";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.username = React.createRef();
    this.password = React.createRef();
    this.passwordrepeat = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      emailWarning: false,
      usernameWarning: false,
      passwordEmpty: false,
      passwordWarning: false,
      passwordWrong: false,
    }
  }

  onSubmit() {
    let user = {
      email: this.email.current.value,
      username: this.username.current.value,
      password: this.password.current.value
    };
    if (user.email === '') {
      this.setState({emailWarning: true});
      return
    }
    if (user.username === '') {
      this.setState({usernameWarning: true});
    }
    if (user.password === '') {
      this.setState({passwordEmpty: true})
    }
    if (user.password < 7) {
      this.setState({passwordWarning: true})
    }
    if (user.password !== this.passwordrepeat.current.value) {
      this.setState({passwordWrong: true})
    }
  }
  render() {
    return (
        <Container className='my-3'>
          <Form className='d-flex justify-content-sm-center'>
            <Col md={5}><Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={this.email} placeholder="Email"/>
              {this.state.emailWarning &&
              <Alert variant='warning' dismissible onClose={() => this.setState({emailWarning: false})}>Email nie może być pusty</Alert>}
            </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nazwa użytkownika</Form.Label>
                <Form.Control type="email" ref={this.username} placeholder="Nazwa użytkownika"/>
                {this.state.usernameWarning &&
                <Alert variant='warning' dismissible onClose={() => this.setState({usernameWarning: false})}>Nazwa
                  użytkownika nie może być pusta.</Alert>}
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" ref={this.password} placeholder="Hasło"/>
                {this.state.passwordEmpty &&
                <Alert variant='warning' dismissible onClose={() => this.setState({passwordEmpty: false})}>Hasło nie może być puste</Alert>}
              {this.state.passwordWarning &&
                <Alert variant='danger' dismissible onClose={() => this.setState({passwordWarning: false})}>Hasło nie może być krótsze niż 7 znaków</Alert>}
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control type="password" ref={this.passwordrepeat} placeholder="Powtórz hasło"/>
                {this.state.passwordWrong &&
                <Alert variant='warning' dismissible onClose={() => this.setState({passwordWrong: false})}>Hasła są różne</Alert>}
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Akceptuje regulamin serwisu"/>
              </Form.Group>
              <Button variant="primary" onClick={this.onSubmit}>
                Zarejestruj
              </Button>
              {/*<Loading />*/}
            </Col>
          </Form>
        </Container>
    );
  }
}

export default RegisterPage;
