import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { LinkContainer } from 'react-router-bootstrap'
import {faClock, faDollarSign, faInfo, faMapMarkerAlt, faWrench} from "@fortawesome/free-solid-svg-icons";
import '../Css/AdListItem.css'
import {Link} from "react-router-dom";

class OfferToAccept extends Component {
  // title={offer.title}
  // description={offer.description}
  // userData={offer.owner}
  // category={offer.category.name}
  // photos={offer.photos}
  // price={offer.price}
  // condition={offer.condition}
  // publicId={offer.publicIdentifier}

  render() {
    return (
        <Card className="my-2">
          <Row className='no-gutters'>
            <LinkContainer to='/offerpage' className='offer-image'>
              <Col lg={4}>
                <Card.Img src="https://i.picsum.photos/id/737/260/160.jpg"/>
              </Col>
            </LinkContainer>
            <Col lg={8}>
              <Card.Body>
                <Row>
                  <Col>
                    <Link to={'/offerpage'}><Card.Title>{this.props.title}</Card.Title></Link>
                    <Card.Text><FontAwesomeIcon icon={faDollarSign}/> {this.props.price}zł</Card.Text>
                    <Card.Text className="text-muted">{this.props.category}</Card.Text>
                  </Col>
                  <Col>
                    <Card.text>{this.props.description}</Card.text>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
          <Card.Footer className="text-muted">
            <Row>
              <Col className="py-1" md={3}><FontAwesomeIcon icon={faMapMarkerAlt}/> {this.props.userData.city}</Col>
              <Col className="py-1" md={3}><FontAwesomeIcon icon={faClock}/> Wczoraj</Col>
              <Col className="py-1" md={3}><FontAwesomeIcon icon={faWrench}/> {this.props.condition}</Col>
              {/*<Col className="py-1" md={3}><FontAwesomeIcon icon={faInfo}/> {this.props.publicId}</Col>*/}
            </Row>
          </Card.Footer>
        </Card>
    );
  }
}

export default OfferToAccept;
