import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faMapMarker, faPhoneAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import path from "../../api";
import './UserCard.css'

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.state = {
      userData: this.props.userData
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({userData: this.props.userData});
    }
  }
  handleAvatarChange(e) {
    e.stopPropagation();
    e.preventDefault();
    let file = e.target.files[0];
    console.log(file);
    this.setState({file}); /// if you want to upload latter
  }
  render() {
    return (
        <Card>
          <Card.Header className={'avatar d-flex justify-content-sm-center'}>
            <Card.Img onClick={() => this.avatar.click()} style={{objectFit: 'cover', width: '200px', height: '200px' }} variant="top" className='rounded-circle avatar-image' src={path + "upload/av/av_17_1581086374_wiata.png"} />
            <input type="file" id="file" onChange={this.handleAvatarChange} ref={(ref) => this.avatar = ref} style={{display: 'none'}}/>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faUser}/></Col>
                <Col md={8}>{this.state.userData.name}</Col>
              </Row>
            </Card.Title>
            <div>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faMapMarker}/></Col>
                <Col md={8}>{this.state.userData.city}</Col>
              </Row>
            </div>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faPhoneAlt}/></Col>
                <Col md={8}>{this.state.userData.phoneNumber}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                <Col md={8}>{this.state.userData.email}</Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
    );
  }
}

export default UserCard;
