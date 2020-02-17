import React, {Component} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import path from "../../api";
import Loading from "./Loading";
import Alert from "react-bootstrap/Alert";

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isLoading: false,
      passwordRepeat: '',
      message: '',
      error: false,
      success: false,
      errorsResponse: false,
      passwordData: {
        oldPassword: '',
        newPassword: ''
      }
    }
  }
  getInitialState() {
    this.setState({
      isLoading: false,
      message: '',
      error: false,
      success: false,
      errorsResponse: false,
    })
  }
  handleChange = (event) => {
    const passwordData = this.state.passwordData;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'passwordRepeat') {
      this.setState({passwordRepeat: value});
      return
    }
    passwordData[name] = value;
    this.setState({
      passwordData: passwordData
    });
  };
  handleSubmit() {
    this.getInitialState();
    this.setState({isLoading: true});
    if (this.state.passwordData.newPassword !== this.state.passwordRepeat) {
      this.setState({message: 'Hasła się róznią', error: true, isLoading: false});
    }
    if (this.state.passwordData.oldPassword === '') {
      this.setState({message: 'Stare hasło jest puste', error: true, isLoading: false});
      return
    }
    const AuthStr = 'Bearer ' + this.props.token;
    const passwordData = this.state.passwordData;

    axios
        .patch(path + 'api/user/update-password', passwordData, { headers: { Authorization: AuthStr } })
        .then(res => {
          this.setState({isLoading: false, success: true});
        })
        .catch(err => {
          this.setState({isLoading: false, errorsResponse: err.response.data});
        })
  }
  render() {
    return (
        <Form as={Col} lg={4}>
          <Form.Label as={Row} column lg={12}><h3>Zmień hasło</h3></Form.Label>
            <Form.Group as={Row} controlId="formCurrentPassword">
              <Form.Label column lg={5}>Obecne hasło:</Form.Label>
              <Col lg={7}><Form.Control name="oldPassword" type="password" placeholder="Wpisz obecne hasło" onChange={this.handleChange} /></Col>
            </Form.Group>
          {this.state.errorsResponse.oldPassword !== undefined &&
          <Alert variant='danger' dismissible onClose={() => this.setState({error: false})}>{this.state.errorsResponse.oldPassword}</Alert>}
            <Form.Group as={Row} controlId="formNewPassword">
            <Form.Label column lg={5}>Nowe hasło:</Form.Label>
            <Col lg={7}><Form.Control name="newPassword" type="password" placeholder="Wpisz nowe hasło" onChange={this.handleChange} /></Col>
          </Form.Group>
          {this.state.errorsResponse.rawPassword !== undefined &&
          <Alert variant='danger' dismissible onClose={() => this.setState({error: false})}>{this.state.errorsResponse.rawPassword}</Alert>}
          <Form.Group as={Row} controlId="formCurrentPasswordRepeat">
            <Form.Label column lg={5}>Potwórz hasło:</Form.Label>
            <Col lg={7}><Form.Control type="password" name="passwordRepeat" placeholder="Powtórz hasło" onChange={this.handleChange}  /></Col>
          </Form.Group>
          {this.state.errorsResponse.newPassword !== undefined &&
          <Alert variant='danger' dismissible onClose={() => this.setState({error: false})}>{this.state.errorsResponse.newPassword}</Alert>}
          {this.state.error &&
          <Alert variant='warning' dismissible onClose={() => this.setState({error: false})}>{this.state.message}</Alert>}
          {this.state.success &&
          <Alert variant='success' dismissible onClose={() => this.setState({success: false})}>Pomyślnie zmieniono hasło</Alert>}
          <Button onClick={this.handleSubmit}>Zmień hasło</Button>
          {this.state.isLoading && <Loading/>}
        </Form>
    );
  }
}

export default PasswordChange;
