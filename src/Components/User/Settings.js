import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import {Col, Container, Row} from "react-bootstrap";
import UserCard from "../Various/UserCard";
import PasswordChange from "../Various/PasswordChange";
import axios from 'axios'
import path from "../../api";
import Loading from "../Various/Loading";


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userData: {
        email: 'przykład@przykład.pl',
        username: 'Nazwa użytkownika'
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
                <Col md={7}><Form.Control type="text" placeholder="Wpisz imię" /></Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPhone">
                <Form.Label column md={5}>Numer telefonu: </Form.Label>
                <Col md={7}><Form.Control type="tel" placeholder="Wpisz numer telefonu" /></Col>
              </Form.Group>
            <Form.Group as={Row} controlId="formCity">
              <Form.Label column md={5}>Miasto: </Form.Label>
              <Col md={7}><Form.Control type="text" placeholder="Wpisz miasto" /></Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCity">
              <Form.Label column md={5}>Województwo: </Form.Label>
              <Col md={7}><Form.Control type="text" placeholder="Wpisz miasto" /></Col>
            </Form.Group>
            {this.state.isLoading && <Loading/>}
          </Form>
            <PasswordChange />
          </Row>
        </Container>
    );
  }
}

export default Settings;
