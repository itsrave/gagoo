import React, {Component} from 'react';
import {Col, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {Cookies, withCookies} from 'react-cookie';
import Loading from "../Various/Loading";
import {instanceOf} from "prop-types";
import Alert from "react-bootstrap/Alert";
import {Link, Redirect} from "react-router-dom";
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
      noLogin: false,
      redirect: false,
    }
  }
  getInitialState() {
    this.setState({
      isLoading: false,
      usernameWarning: false,
      passwordWarning: false,
      wrongCredentials: false,
      unexpectedError: false,
      succesfulLogin: false,
      noLogin: false,
      redirect: false,
    })
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.match.params.reference === 'nologin') {
        this.setState({noLogin: true, settingsActive: true})
      }
    }
  }
  componentDidMount() {
    if (this.props.token !== undefined){
      this.setState({redirect: true})
    }
    if (this.props.match.params.reference === 'nologin') {
      this.setState({noLogin: true, settingsActive: true})
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.getInitialState();
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
        cookies.set('refreshToken', res.data.refresh_token, {path: '/'});
        this.props.setToken();
        this.setState({succesfulLogin: true, isLoading: false, redirect: true});
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
        <Form className='d-flex justify-content-sm-center' onSubmit={this.onSubmit}>
          <Col md={5}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name='username'
                ref={this.username}
                placeholder="Email lub nazwa użytkownika"
              />
              {this.state.usernameWarning &&
              <Alert
                variant='warning'
                dismissible
                onClose={() => this.setState({usernameWarning: false})}>Nazwa użytkownika nie może być pusta.
              </Alert>}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" ref={this.password} name='password' placeholder="Hasło"/>
              {this.state.passwordWarning &&
              <Alert variant='warning' dismissible onClose={() => this.setState({passwordWarning: false})}>Hasło nie
                może być puste.</Alert>}
              <Form.Text className="text-muted">
                <Link to={'/forgotpassword'}>Nie pamiętasz hasła?</Link>
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type='submit'>Zaloguj</Button>
            <Form.Group />
            {this.state.isLoading && <Loading/>}
            {this.state.succesfulLogin &&
            <Alert variant='success' dismissible onClose={() => this.setState({succesfulLogin: false})}>Pomyślnie
              zalogowano, za chwilę zostaniesz przekierowany...</Alert>}
            {this.state.wrongCredentials &&
            <Alert variant='danger' dismissible onClose={() => this.setState({wrongCredentials: false})}>Błędne hasło lub nazwa użytkownika.</Alert>}
            {this.state.unexpectedError &&
            <Alert variant='danger' dismissible onClose={() => this.setState({unexpectedError: false})}>Niespodziewany błąd, spróbuj ponownie później.</Alert>}
            {this.state.noLogin &&
            <Alert variant='warning' dismissible onClose={() => this.setState({noLogin: false})}>Musisz się zalogować aby wyświetlić tę stronę.</Alert>}
          </Col>
        </Form>
        { this.state.redirect && <Redirect to="/" />}
      </Container>
    );
  }
}

export default withCookies(LoginPage);
