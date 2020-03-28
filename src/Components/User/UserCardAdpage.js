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
  render() {
    return (
        <Card>
          <Card.Header className={'d-flex justify-content-sm-center'}>
            <Card.Img style={{objectFit: 'cover', width: '200px', height: '200px' }} variant="top" className='rounded-circle avatar-image' src={path + "upload/av/" + this.props.user.avatar} />
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <Row>
                <Col xs={1}><FontAwesomeIcon icon={faUser}/></Col>
                <Col xs={10}>{this.props.user.name}</Col>
              </Row>
            </Card.Title>
            <div>
              <Row>
                <Col xs={1}><FontAwesomeIcon icon={faMapMarker}/></Col>
                <Col xs={8}>{this.props.user.city}</Col>
              </Row>
            </div>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Row>
                <Col xs={1}><FontAwesomeIcon icon={faPhoneAlt}/></Col>
                <Col xs={8}>{this.props.user.phoneNumber}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col xs={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                <Col xs={8}>{this.props.user.email}</Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
    );
  }
}

export default UserCardAdpage;
