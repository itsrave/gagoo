import React, {Component} from 'react';
import {Button, Carousel, Form, OverlayTrigger, Popover, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt, faClock, faWrench, faInfo, faDollarSign} from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from 'react-router-bootstrap'
import {Link} from "react-router-dom";
import '../Css/AdListItem.css'
import path from "../../api";
import Alert from "react-bootstrap/Alert";

class OfferCard extends Component {
  renderCategories() {
    let categories = this.props.categories.map((category) => category.name);
    return categories.filter(Boolean).join(' > ');
  }
  componentDidMount() {
    this.renderCategories()
  }
  render() {
    return (
        <Card className="my-2">
          <Row className='no-gutters'>
            <LinkContainer to={`/offerpage/${this.props.publicId}`}>
            <Col lg={4} className="offer-image">
              <img
                  className="d-block mx-auto img-fluid carousel-image"
                  src={path + 'upload/offer-imgs/' + this.props.photos[0]}
                  alt={"Zdjęcie oferty"}
              />
            </Col>
            </LinkContainer>
            <Col lg={8}>
              <Card.Body>
                    <LinkContainer to={`/offerpage/${this.props.publicId}`}>
                      <Link to={'/offerpage'}><Card.Title>{this.props.title}</Card.Title></Link>
                    </LinkContainer>
                    <Card.Text><FontAwesomeIcon icon={faDollarSign}/> {this.props.price}zł</Card.Text>
                    <Card.Text className="text-muted">{this.renderCategories()}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
          <Card.Footer className="text-muted">
            <Row>
              <Col className="py-1" md={3}><FontAwesomeIcon icon={faMapMarkerAlt}/> {this.props.userData.city}</Col>
              <Col className="py-1" md={3}><FontAwesomeIcon icon={faClock}/> {this.props.created}</Col>
              <Col className="py-1" md={3}><FontAwesomeIcon icon={faWrench}/> {this.props.condition}</Col>
            </Row>
          </Card.Footer>
        </Card>
    );
  }
}

export default OfferCard;
