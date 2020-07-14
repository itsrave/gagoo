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
    this.email = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isLoading: false,
      emailWarning: false,
      wrongCredentials: false,
      unexpectedError: false,
      redirect: false,
    }
  }
  getInitialState() {
    this.setState({
      isLoading: false,
      emailWarning: false,
      wrongCredentials: false,
      unexpectedError: false,
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
      email: this.email.current.value,
    };
    if (user.email === '') {
      this.setState({emailWarning: true, isLoading: false});
      return
    }
    axios
        .post(path + 'api/login_check', user.email)
        .then(res => {
          this.setState({succesfulSent: true, isLoading: false});
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
              <h3>Zapomniałem hasła</h3>
              <Form.Label>Jeżeli zapomniałeś hasła wprowadź swój email, na który wyślemy link z resetowaniem hasła</Form.Label>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name='username' ref={this.email}
                              placeholder="Email"/>
                {this.state.usernameWarning &&
                <Alert variant='warning' dismissible onClose={() => this.setState({emailWarning: false})}>Nazwa
                  użytkownika nie może być pusta.</Alert>}
              </Form.Group>
              <Button variant="primary" type='submit'>Wyślij</Button>
              <Form.Group />
              {this.state.isLoading && <Loading/>}
              {this.state.succesfulSent &&
              <Alert variant='success' dismissible onClose={() => this.setState({succesfulSent: false})}>Na podany email wysłano wiadomość dotycząca resetowania hasła</Alert>}
              {this.state.wrongCredentials &&
              <Alert variant='danger' dismissible onClose={() => this.setState({wrongCredentials: false})}>Nie ma użytkownika z takim adresem email</Alert>}
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
