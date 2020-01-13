import React, {Component} from 'react';
import {Card, Container} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";

class AdPage extends Component {
  render() {
    return (
        <Container>
          <Row>
          <div className='d-flex flex-column'>
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
          </div>
          <Card>
            <Card.Body>
              <Card.Title>Pinuś</Card.Title>
              <Card.Text>
                Miastko
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>+07000</ListGroupItem>
              <ListGroupItem>pinus@miastko.pl</ListGroupItem>
            </ListGroup>
          </Card>
          </Row>
        </Container>
    );
  }
}

export default AdPage;
