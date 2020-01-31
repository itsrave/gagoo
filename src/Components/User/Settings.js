import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import {Col, Container, Row} from "react-bootstrap";
import UserCard from "../Various/UserCard";
import PasswordChange from "../Various/PasswordChange";
import axios from 'axios'
import path from "../../api";
import Loading from "../Various/Loading";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";


class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Form = React.createRef();
    this.state = {
      isLoading: false,
      userData: {
        email: 'przykład@przykład.pl',
        username: 'Nazwa użytkownika',
        name: '',
        phoneNumber: '',
        city: '',
        state: '',
        zipCode: '',
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.token !== prevProps.token) {
      this.setState({isLoading: true});
      this.getUserData();
      setTimeout(function() {
        this.setState({isLoading: false});
      }.bind(this), 2000)
    }
  }
  componentDidMount() {
    this.setState({isLoading: true});
    this.getUserData();
    setTimeout(function() {
      this.setState({isLoading: false});
    }.bind(this), 2000)
  }
  getUserData() {
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .get(path + 'api/user/get-data',{ headers: { Authorization: AuthStr } })
        .then(res => this.setState({userData: res.data, isLoading: false}))
        .catch(err => {
          this.setState({isLoading: false});
          console.log(err);
        });
  }

  handleSubmit(e) {
    this.setState({isLoading: true});
    const AuthStr = 'Bearer ' + this.props.token;
    const userData = this.state.userData;
    axios
        .patch(path + 'api/user/update', userData, { headers: { Authorization: AuthStr } })
        .then(res => {
          setTimeout(function() {
            this.setState({isLoading: false});
          }.bind(this), 2000)
        })
        .catch(err => {
          console.log(err);
          this.setState({isLoading: false});
        })
  }
  handleChange = (event) => {
    const userData = this.state.userData;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    userData[name] = value;
    this.setState({
      userData: userData
    });
  };
  render() {
    return (
        <Container className='my-3'>
          <Row>
          <Col md={4}>
            <UserCard />
            {this.state.isLoading && <Loading/>}
          </Col>
          <Form as={Col} md={4}>
            <Form.Label as={Row} column md={12}><h3>Twoje dane</h3></Form.Label>
              <Form.Group as={Row} controlId="formEmail">
                <Form.Label column md={5}>Email: </Form.Label>
                <Col md={7}><Form.Control plaintext readOnly value={this.state.userData.email}/></Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formUsername">
                <Form.Label column md={5}>Nazwa użytkownika: </Form.Label>
                <Col md={7}><Form.Control plaintext readOnly value={this.state.userData.username}/></Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formName">
                <Form.Label column md={5}>Imię: </Form.Label>
                <Col md={7}><Form.Control required type="text" placeholder="Wpisz imię" name={'name'} onChange={this.handleChange} value={this.state.userData.name} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPhone">
                <Form.Label column md={5}>Numer telefonu: </Form.Label>
                <Col md={7}><Form.Control type="tel" placeholder="Wpisz numer telefonu" name={'phoneNumber'} onChange={this.handleChange} value={this.state.userData.phoneNumber} />
                </Col>
              </Form.Group>
            <Form.Group as={Row} controlId="formCity">
              <Form.Label column md={5}>Miasto: </Form.Label>
              <Col md={7}><Form.Control type="text" placeholder="Wpisz miejscowość" name={'city'} onChange={this.handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formState">
              <Form.Label column md={5}>Województwo: </Form.Label>
              <Col md={7}><Form.Control type="text" placeholder="Wpisz województwo" name={'state'} onChange={this.handleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formZipCode">
              <Form.Label column md={5}>Kod pocztowy: </Form.Label>
              <Col md={7}><Form.Control type="text" placeholder="00-000" name={'zipCode'} onChange={this.handleChange} />
              </Col>
            </Form.Group>
            {this.state.error &&
            <Alert variant='danger' dismissible onClose={() => this.setState({error: false})}>{this.state.errorMessage}</Alert>}
            {this.state.isLoading && <Loading/>}
            <Button variant="primary" onClick={this.handleSubmit}>
              Zaktualizuj dane
            </Button>
          </Form>
            <PasswordChange />
          </Row>
        </Container>
    );
  }
}

export default Settings;
