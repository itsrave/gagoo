import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import {Col, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faEnvelope, faPhoneAlt, faMapMarker} from "@fortawesome/free-solid-svg-icons";
import path from "../../api";
import './UserCard.css'
import axios from "axios";
import Forxsata from 'form-data'
import Alert from "react-bootstrap/Alert";
import Loading from "../Various/Loading";
import Form from "react-bootstrap/Form";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.state = {
      userData: this.props.userData,
      successMessage: [],
      errorMessage: [],
      success: false,
      errorWarning: false
    }
  }
  getInitialState() {
    this.setState({
      successMessage: [],
      errorMessage: [],
      success: false,
      errorWarning: false
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({userData: this.props.userData});
    }
  }
  handleAvatarChange(e) {
    this.getInitialState();
    e.stopPropagation();
    e.preventDefault();
    let file = e.target.files[0];
    let data = new Forxsata();
    data.append('avatar', file, file.fileName);
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .post(path + 'api/user/update-avatar', data,{ headers: { Authorization: AuthStr, } })
        .then(res => {
          this.setState({successMessage: res.data, success: true});
          this.props.update()
        })
        .catch(err => {
          this.setState({errorMessage: err.response.data.tempAvatar, errorWarning: true});
        });
    // TODO LIMIT FILE OPTIONS
  }
  render() {
    return (
        <>
          <Card>
            <Card.Header className={'avatar d-flex justify-content-center'}>
              <Card.Img onClick={() => this.avatar.click()} style={{objectFit: 'cover', width: '200px', height: '200px' }} variant="top" className='rounded-circle avatar-image' src={path + "upload/av/" + this.state.userData.avatar} />
              <input type="file" id="file" onChange={this.handleAvatarChange} ref={(ref) => this.avatar = ref} style={{display: 'none'}}/>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col xs={1}><FontAwesomeIcon icon={faUser}/></Col>
                  <Col xs={8}>{this.state.userData.name}</Col>
                </Row>
              </Card.Title>
              <div>
                <Row>
                  <Col xs={1}><FontAwesomeIcon icon={faMapMarker}/></Col>
                  <Col xs={8}>{this.state.userData.city}</Col>
                </Row>
              </div>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Row>
                  <Col xs={1}><FontAwesomeIcon icon={faPhoneAlt}/></Col>
                  <Col xs={8}>{this.state.userData.phoneNumber}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col xs={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                  <Col xs={8}>{this.state.userData.email}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
          <div className="mt-3" />
          {this.state.success &&
          <Alert variant='success' dismissible onClose={() => this.setState({success: false})}>{this.state.successMessage[0]}</Alert>}
          {this.state.errorWarning &&
          <Alert variant='danger' dismissible onClose={() => this.setState({errorWarning: false})}>
            {this.state.errorMessage.map((msg, i) =>
              <div key={i}>{msg}<br /></div>
            )}</Alert>}
          {this.state.isLoading && <Loading/>}
        </>
    );
  }
}

export default UserCard;
