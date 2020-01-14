import React, {Component} from 'react';
import {Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";

class AdListItem extends Component {
  render() {
    return (
          <Card>
            <Row className='no-gutters'>
              <Card.Img variant="left" src="https://i.picsum.photos/id/737/260/160.jpg"/>
            <Card.Body>
              <Card.Title>Uturbiony golf3 tdi 1.6</Card.Title>
              <Card.Text>
                4500zł
              </Card.Text>
              <Card.Text className="text-muted">Kategoria > Subkategoria</Card.Text>
              <Card.Footer className="text-muted">
                <Row>
                  <Col md={2}><FontAwesomeIcon icon={faMapMarkerAlt}/> Miastko</Col>
                  <Col md={2}><FontAwesomeIcon icon={faClock}/> Wczoraj</Col>
                </Row>
              </Card.Footer>
            </Card.Body>
            </Row>

          </Card>
    );
  }
}

export default AdListItem;
