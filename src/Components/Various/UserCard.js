import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import {Col, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign, faEnvelope, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

class UserCard extends Component {
  render() {
    return (
        <Card>
          <Card.Header className='d-flex justify-content-sm-center'>
            <Card.Img style={{objectFit: 'cover', width: '200px', height: '200px' }} variant="top" className='rounded-circle' src="https://i.picsum.photos/id/737/260/160.jpg" />
          </Card.Header>
          <Card.Body>
            <Card.Title>Pinuś</Card.Title>
            <Card.Text>
              Miastko
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faDollarSign}/></Col>
                <Col md={8}>4500zł</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faPhoneAlt}/></Col>
                <Col md={8}>+07000</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                <Col md={8}>pinus@miastko.pl</Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
    );
  }
}

export default UserCard;
