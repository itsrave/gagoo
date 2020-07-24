import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col, Container} from "react-bootstrap";
import Loading from "../Various/Loading";
import axios from 'axios'
import Alert from "react-bootstrap/Alert";
import path from "../../api";
import {Link} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.username = React.createRef();
    this.password = React.createRef();
    this.passwordrepeat = React.createRef();
    this.acceptPolicy = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      emailWarning: false,
      usernameWarning: false,
      passwordEmpty: false,
      passwordWarning: false,
      passwordWrong: false,
      succesfulRegister: false,
      isLoading: false,
      emailWarningMessage: false,
      usernameWarningMessage: false,
      usernameTooShort: false,
      policyWarning: false,
      emailMessage: '',
      usernameMessage: '',
    }
  }
  getInitialState() {
    this.setState({
      emailWarning: false,
      usernameWarning: false,
      passwordEmpty: false,
      passwordWarning: false,
      passwordWrong: false,
      succesfulRegister: false,
      isLoading: false,
      emailWarningMessage: false,
      usernameWarningMessage: false,
      usernameTooShort: false,
      policyWarning: false,
      emailMessage: '',
      usernameMessage: '',
    })
  }
  onSubmit(e) {
    e.preventDefault();
    this.getInitialState();
    this.setState({isLoading: true});
    let user = {
      email: this.email.current.value,
      username: this.username.current.value,
      password: this.password.current.value
    };
    if (this.acceptPolicy.current.checked === false) {
      this.setState({policyWarning: true, isLoading: false});
      return;
    }
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
    if (user.username.length < 4) {
      this.setState({usernameTooShort: true, isLoading: false});
      return;
    }
    axios
        .post(path + 'public-api/user/register', user)
        .then(res => {
          this.setState({succesfulRegister: true, isLoading: false});
          this.email.current.value = '';
          this.username.current.value = '';
          this.password.current.value = '';
          this.passwordrepeat.current.value = '';
        })
        .catch(err => {
          if (err.response.status === 400) {
            if (err.response.data.email !== undefined) {
              err.response.data.email.map((message) => {
                let emailMsg = this.state.emailMessage;
                emailMsg += message;
                this.setState({emailMessage: emailMsg, emailWarningMessage: err.response.data.email !== '', isLoading: false});
              });
            }
            if (err.response.data.username !== undefined) {
              err.response.data.username.map((message) => {
                let usernameMsg = this.state.usernameMessage;
                usernameMsg += message;
                this.setState({usernameMessage: usernameMsg, usernameWarningMessage: err.response.data.username !== '', isLoading: false});
              });
            }
          } else {
            this.setState({unexpectedError: true, isLoading: false});
            console.log(err);
          }
        });
  }
  render() {
    return (
        <Container className='my-3'>
          <Form className='d-flex justify-content-sm-center' onSubmit={this.onSubmit}>
            <Col md={5}><Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={this.email} placeholder="Email"/>
              {this.state.emailWarning &&
              <Alert variant='warning' dismissible onClose={() => this.setState({emailWarning: false})}>Email nie może być pusty</Alert>}
              {this.state.emailWarningMessage &&
              <Alert variant='danger' dismissible onClose={() => this.setState({emailWarningMessage: false})}>{this.state.emailMessage}</Alert>}
            </Form.Group>
              <Form.Group controlId="formUsername">
                <Form.Label>Nazwa użytkownika</Form.Label>
                <Form.Control type="text" ref={this.username} placeholder="Nazwa użytkownika"/>
                {this.state.usernameWarning &&
                <Alert variant='warning' dismissible onClose={() => this.setState({usernameWarning: false})}>Nazwa
                  użytkownika nie może być pusta.</Alert>}
                {this.state.usernameTooShort &&
                <Alert variant='danger' dismissible onClose={() => this.setState({usernameTooShort: false})}>Nazwa użytkownika nie może być krótsza niż 4 znaki.</Alert>}

              {this.state.usernameWarningMessage &&
                <Alert variant='danger' dismissible onClose={() => this.setState({usernameWarningMessage: false})}>{this.state.usernameMessage}</Alert>}</Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" ref={this.password} placeholder="Hasło"/>
                {this.state.passwordEmpty &&
                <Alert variant='warning' dismissible onClose={() => this.setState({passwordEmpty: false})}>Hasło nie może być puste</Alert>}
              {this.state.passwordWarning &&
                <Alert variant='danger' dismissible onClose={() => this.setState({passwordWarning: false})}>Hasło nie może być krótsze niż 7 i nie dłuższe niż 40 znaków</Alert>}
              </Form.Group>
              <Form.Group controlId="formRepeatPassword">
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control type="password" ref={this.passwordrepeat} placeholder="Powtórz hasło"/>
                {this.state.passwordWrong &&
                <Alert variant='warning' dismissible onClose={() => this.setState({passwordWrong: false})}>Hasła są różne</Alert>}
              </Form.Group>
              <Form.Group controlId="form">
                <Form.Check type="checkbox" ref={this.acceptPolicy} label="Akceptuje regulamin serwisu"/>
              </Form.Group>
              {this.state.policyWarning &&
              <Alert variant='warning' dismissible onClose={() => this.setState({policyWarning: false})}>
                Musisz zaakceptować regulamin aby się zarejestrować.
              </Alert>}
              {this.state.succesfulRegister &&
              <Alert variant='success' dismissible onClose={() => this.setState({succesfulRegister: false})}>
                Rejestracja pomyślna, możesz się teraz <Link to='/login/registerpage'>zalogować</Link>.
              </Alert>}
              <Button variant="primary" type={'submit'}>
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
