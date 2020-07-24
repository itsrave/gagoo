import React, {Component} from 'react';
import {Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faDollarSign, faInfo, faMapMarkerAlt, faWrench} from "@fortawesome/free-solid-svg-icons";
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from "react-router-dom";
import '../Css/AdListItem.css'

class AdListItem extends Component {

  render() {
    return (
          <Card>
            <Row className='no-gutters'>
              <LinkContainer to='/offerpage' className='offer-image'>
                <Col lg={4}>
                    <Card.Img src="https://i.picsum.photos/id/737/260/160.jpg"/>
                </Col>
              </LinkContainer>
              <Col lg={8}>
                <Card.Body>
                  <Link to={'/offerpage'}><Card.Title>Uturbiony golf3 tdi 1.6</Card.Title></Link>
                  <Card.Text><FontAwesomeIcon icon={faDollarSign} /> 4500zł</Card.Text>
                  <Card.Text className="text-muted">Kategoria > Subkategoria</Card.Text>
                </Card.Body>
              </Col>
            </Row>
            <Card.Footer className="text-muted">
              <Row>
                <Col className="py-1" md={3}><FontAwesomeIcon icon={faMapMarkerAlt}/> Miastko</Col>
                <Col className="py-1" md={3}><FontAwesomeIcon icon={faClock}/> Wczoraj</Col>
                <Col className="py-1" md={3}><FontAwesomeIcon icon={faWrench}/> Nowy</Col>
                <Col className="py-1" md={3}><FontAwesomeIcon icon={faInfo}/> 2312321321</Col>
              </Row>
            </Card.Footer>
          </Card>
    );
  }
}

export default AdListItem;
