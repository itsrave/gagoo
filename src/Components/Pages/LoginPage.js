import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {withCookies, Cookies} from 'react-cookie';
import Loading from "../Various/Loading";
import {instanceOf} from "prop-types";
import Alert from "react-bootstrap/Alert";
import {Redirect} from "react-router-dom";
import path from "../../api";

class LoginPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isLoading: false,
      usernameWarning: false,
      passwordWarning: false,
      wrongCredentials: false,
      unexpectedError: false,
      succesfulLogin: false,
      redirect: false,
    }
  }
  componentDidMount() {
    if (this.props.token !== undefined){
      this.setState({redirect: true})
    }
  }

  onSubmit() {
    this.toggleLoading();
    let user = {
      username: this.username.current.value,
      password: this.password.current.value
    };
    if (user.username === '') {
      this.setState({usernameWarning: true, isLoading: false});
      return
    }
    if (user.password === '') {
      this.setState({passwordWarning: true, isLoading: false});
      return
    }
    axios
        .post(path + 'api/login_check', user)
        .then(res => {
          const {cookies} = this.props;
          cookies.set('token', res.data.token, {path: '/'});
          this.setState({succesfulLogin: true, isLoading: false, redirect: true});
          this.props.setToken()
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.setState({wrongCredentials: true, isLoading: false});
          } else {
            this.setState({unexpectedError: true, isLoading: false});
            console.log(err);
          }
        });
  }

  toggleLoading() {
    this.setState({isLoading: !this.state.isLoading});
  }

  render() {
    return (
        <Container className='my-3'>
          <Form className='d-flex justify-content-sm-center'>
            <Col md={5}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" name='username' ref={this.username}
                              placeholder="Email lub nazwa użytkownika"/>
                {this.state.usernameWarning &&
                <Alert variant='warning' dismissible onClose={() => this.setState({usernameWarning: false})}>Nazwa
                  użytkownika nie może być pusta.</Alert>}
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" ref={this.password} name='password' placeholder="Hasło"/>
                {this.state.passwordWarning &&
                <Alert variant='warning' dismissible onClose={() => this.setState({passwordWarning: false})}>Hasło nie
                  może być puste.</Alert>}
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Zapamiętaj mnie"/>
              </Form.Group>
              <Button variant="primary" onClick={this.onSubmit}>Zaloguj</Button>
              <Form.Group />
              {this.state.isLoading && <Loading/>}
              {this.state.succesfulLogin &&
              <Alert variant='success' dismissible onClose={() => this.setState({succesfulLogin: false})}>Pomyślnie
                zalogowano, za chwilę zostaniesz przekierowany...</Alert>}
              {this.state.wrongCredentials &&
              <Alert variant='danger' dismissible onClose={() => this.setState({wrongCredentials: false})}>Błędne hasło lub nazwa użytkownika.</Alert>}
              {this.state.unexpectedError &&
              <Alert variant='danger' dismissible onClose={() => this.setState({unexpectedError: false})}>Niespodziewany błąd, spróbuj ponownie później.</Alert>}
            </Col>
          </Form>
          { this.state.redirect && <Redirect to="/" />}
        </Container>
    );
  }
}

export default withCookies(LoginPage);
