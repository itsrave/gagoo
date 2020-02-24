import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import {Col, Container, Row} from "react-bootstrap";
import UserCard from "./UserCard";
import PasswordChange from "../Various/PasswordChange";
import axios from 'axios'
import path from "../../api";
import Loading from "../Various/Loading";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";


const states = [
  'dolnośląskie',
  'kujawsko-pomorskie',
  'lubelskie',
  'lubuskie',
  'łódzkie',
  'małopolskie',
  'mazowieckie',
  'opolskie',
  'podkarpackie',
  'podlaskie',
  'pomorskie',
  'śląskie',
  'świętokrzyskie',
  'warmińsko-mazurskie',
  'wielkopolskie',
  'zachodniopomorskie'
];

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.Form = React.createRef();
    this.state = {
      isLoading: false,
      validateMessage: false,
      success: false,
      userData: {
        email: '',
        username: '',
        name: '',
        phoneNumber: '',
        city: '',
        state: '',
        zipCode: '',
        avatar: '',
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
    this.setState({isLoading: true, validateMessage: false, success: false,});
    const userData = this.state.userData;
    if (userData.name === ''){
      this.setState({validateMessage: true, isLoading: false});
      return
    }
    if (userData.phoneNumber === ''){
      this.setState({validateMessage: true, isLoading: false});
      return
    }
    if (userData.city === ''){
      this.setState({validateMessage: true, isLoading: false});
      return
    }
    if (userData.state === ''){
      this.setState({validateMessage: true, isLoading: false});
      return
    }
    if (userData.zipCode === ''){
      this.setState({validateMessage: true, isLoading: false});
      return
    }
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .patch(path + 'api/user/update', userData, { headers: { Authorization: AuthStr } })
        .then(res => {
          console.log(res.data);
          this.setState({isLoading: false, success: true});
        })
        .catch(err => {
          console.log(err.response.data);
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
          <Col className='pb-3' lg={4}>
            <UserCard update={this.getUserData} token={this.props.token} userData={this.state.userData} />
            {this.state.isLoading && <Loading/>}
          </Col>
          <Form as={Col} className='pb-3' lg={4}>
            <Form.Label as={Row} column lg={12}><h3>Twoje dane</h3></Form.Label>
              <Form.Group as={Row} controlId="formEmail">
                <Form.Label column lg={5}>Email: </Form.Label>
                <Col lg={7}><Form.Control plaintext readOnly value={this.state.userData.email}/></Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formUsername">
                <Form.Label column lg={5}>Nazwa użytkownika: </Form.Label>
                <Col lg={7}><Form.Control plaintext readOnly value={this.state.userData.username}/></Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formName">
                <Form.Label column lg={5}>Imię: </Form.Label>
                <Col lg={7}><Form.Control required type="text" placeholder="Wpisz imię" name={'name'} onChange={this.handleChange} value={this.state.userData.name} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPhone">
                <Form.Label column lg={5}>Numer telefonu: </Form.Label>
                <Col lg={7}><Form.Control type="tel" placeholder="Wpisz numer telefonu" name={'phoneNumber'} onChange={this.handleChange} value={this.state.userData.phoneNumber} />
                </Col>
              </Form.Group>
            <Form.Group as={Row} controlId="formCity">
              <Form.Label column lg={5}>Miasto: </Form.Label>
              <Col lg={7}><Form.Control type="text" placeholder="Wpisz miejscowość" name={'city'} onChange={this.handleChange} value={this.state.userData.city} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formState">
              <Form.Label column lg={5}>Województwo: </Form.Label>
              <Col lg={7}>
                <Form.Control as="select" name={'state'} placeholder="Wpisz województwo" onChange={this.handleChange} value={this.state.userData.state} >
                  <option value="" selected>Wybierz województwo</option>
                  {states.map((state, i) => <option key={i}>{state}</option>)}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formZipCode">
              <Form.Label column lg={5}>Kod pocztowy: </Form.Label>
              <Col lg={7}><Form.Control type="text" placeholder="00-000" name={'zipCode'} onChange={this.handleChange} value={this.state.userData.zipCode} />
              </Col>
            </Form.Group>
            {this.state.validateMessage &&
            <Alert variant='warning' dismissible onClose={() => this.setState({validateMessage: false})}>Pola nie mogą być puste.</Alert>}
            {this.state.success &&
            <Alert variant='success' dismissible onClose={() => this.setState({success: false})}>Zaktualizowano dane pomyślnie.</Alert>}
            {this.state.isLoading && <Loading/>}
            <Button variant="primary" onClick={this.handleSubmit}>
              Zaktualizuj dane
            </Button>
          </Form>
            <PasswordChange className='pb-3' lg={4} token={this.props.token} />
          </Row>
        </Container>
    );
  }
}
export default Settings;
