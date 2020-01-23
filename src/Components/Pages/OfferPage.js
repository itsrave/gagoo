import React, {Component} from 'react';
import {Card, Col, Container} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelope, faDollarSign } from "@fortawesome/free-solid-svg-icons";

class OfferPage extends Component {
  render() {
    return (
        <Container>
          <Row>
            <Col md={8}>
              <Carousel>
              <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.picsum.photos/id/737/260/160.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Card>
                <Card.Img variant="top" src="https://i.picsum.photos/id/737/260/160.jpg"/>
                <Card.Body>
                  <Card.Title>Uturbiony golf3 tdi 1.6</Card.Title>
                  <Card.Text>
                    4500zł
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel>
            </Col>
            <Col md={4}>

            </Col>
          </Row>
        </Container>
    );
  }
}

export default OfferPage;
