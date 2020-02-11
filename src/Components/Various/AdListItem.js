import React, {Component} from 'react';
import {Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt, faClock, faWrench, faInfo, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from 'react-router-bootstrap'
import {Link} from "react-router-dom";
import './AdListItem.css'

class AdListItem extends Component {

  render() {
    return (
          <Card>
            <Row className='no-gutters'>
              <LinkContainer to='/offerpage' className='offer-image'>
                <Card.Img variant="left" src="https://i.picsum.photos/id/737/260/160.jpg"/>
              </LinkContainer>
            <Card.Body>
              <Link to={'/offerpage'}><Card.Title>Uturbiony golf3 tdi 1.6</Card.Title></Link>
              <Card.Text><FontAwesomeIcon icon={faDollarSign} /> 4500zł</Card.Text>
              <Card.Text className="text-muted">Kategoria > Subkategoria</Card.Text>
              <Card.Footer className="text-muted">
                <Row>
                  <Col md={3}><FontAwesomeIcon icon={faMapMarkerAlt}/> Miastko</Col>
                  <Col md={3}><FontAwesomeIcon icon={faClock}/> Wczoraj</Col>
                  <Col md={3}><FontAwesomeIcon icon={faWrench}/> Nowy</Col>
                  <Col md={3}><FontAwesomeIcon icon={faInfo}/> 2312321321</Col>
                </Row>
              </Card.Footer>
            </Card.Body>
            </Row>

          </Card>
    );
  }
}

export default AdListItem;
