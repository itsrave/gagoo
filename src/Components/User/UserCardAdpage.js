import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import path from "../../api";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faMapMarker, faPhoneAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class UserCardAdpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        email: 'przykład@przykład.pl',
        username: 'Nazwa użytkownika',
        name: 'dsadsa',
        phoneNumber: '324124234',
        city: 'fsdfds',
        state: 'dsaada',
        zipCode: '22-222',
        avatar: '',
      }
    }
  }

  render() {
    return (
        <Card>
          <Card.Header className={'d-flex justify-content-sm-center'}>
            <Card.Img style={{objectFit: 'cover', width: '200px', height: '200px' }} variant="top" className='rounded-circle avatar-image' src={path + "upload/av/av_17_1581086374_wiata.png"} />
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faUser}/></Col>
                <Col md={10}>{this.state.userData.name}</Col>
              </Row>
            </Card.Title>
            <div>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faMapMarker}/></Col>
                <Col md={10}>{this.state.userData.city}</Col>
              </Row>
            </div>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faPhoneAlt}/></Col>
                <Col md={10}>{this.state.userData.phoneNumber}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                <Col md={10}>{this.state.userData.email}</Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
    );
  }
}

export default UserCardAdpage;
