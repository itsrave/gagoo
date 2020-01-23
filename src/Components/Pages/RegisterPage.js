import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col, Container} from "react-bootstrap";
import Loading from "../Various/Loading";
import axios from 'axios'
import Alert from "react-bootstrap/Alert";
import path from "../../api";
import {Link} from "react-router-dom";

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
      succesfulRegister: false,
      isLoading: false,
      emailTaken: false,
      emailWrong: false,
      usernameTaken: false,
      emailTakenMessage: '',
      emailWrongMessage: '',
      usernameTakenMessage: '',
    }
  }

  onSubmit() {
    this.setState({isLoading: true});
    let user = {
      email: this.email.current.value,
      username: this.username.current.value,
      password: this.password.current.value
    };
    if (user.email === '') {
      this.setState({emailWarning: true, isLoading: false});
      return
    }
    if (user.username === '') {
      this.setState({usernameWarning: true, isLoading: false});
      return
    }
    if (user.password === '') {
      this.setState({passwordEmpty: true, isLoading: false});
      return
    }
    if (user.password.length < 7 || user.password.length > 40) {
      this.setState({passwordWarning: true, isLoading: false});
      return
    }
    if (user.password !== this.passwordrepeat.current.value) {
      this.setState({passwordWrong: true, isLoading: false});
      return;
    }
    axios
        .post(path + 'user/register', user)
        .then(res => {
          this.setState({succesfulRegister: true, isLoading: false});
        })
        .catch(err => {
          console.log(err.response.data.detail);
          if (err.response.status === 400) {
            this.setState({wrongCredentials: true, isLoading: false});
          } else {
            this.setState({unexpectedError: true, isLoading: false});
            console.log(err);
          }
        });
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
              {this.state.emailTaken &&
              <Alert variant='danger' dismissible onClose={() => this.setState({emailWarning: false})}>{this.state.emailTakenMessage}</Alert>}
              {this.state.emailWrong &&
              <Alert variant='danger' dismissible onClose={() => this.setState({emailWrong: false})}>{this.state.emailWrongMessage}</Alert>}
            </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nazwa użytkownika</Form.Label>
                <Form.Control type="text" ref={this.username} placeholder="Nazwa użytkownika"/>
                {this.state.usernameWarning &&
                <Alert variant='warning' dismissible onClose={() => this.setState({usernameWarning: false})}>Nazwa
                  użytkownika nie może być pusta.</Alert>}
                {this.state.usernameTaken &&
                <Alert variant='danger' dismissible onClose={() => this.setState({usernameTaken: false})}>{this.state.usernameTakenMessage}</Alert>}

              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" ref={this.password} placeholder="Hasło"/>
                {this.state.passwordEmpty &&
                <Alert variant='warning' dismissible onClose={() => this.setState({passwordEmpty: false})}>Hasło nie może być puste</Alert>}
              {this.state.passwordWarning &&
                <Alert variant='danger' dismissible onClose={() => this.setState({passwordWarning: false})}>Hasło nie może być krótsze niż 7 i nie dłuższe niż 40 znaków</Alert>}
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
              {this.state.succesfulRegister &&
              <Alert variant='success' dismissible onClose={() => this.setState({succesfulRegister: false})}>
                Rejestracja pomyślna, możesz się teraz <Link to='/login'>zalogować</Link>.
              </Alert>}
              <Button variant="primary" onClick={this.onSubmit}>
                Zarejestruj
              </Button>
              {this.state.isLoading && <Loading/>}
            </Col>
          </Form>
        </Container>
    );
  }
}

export default RegisterPage;
