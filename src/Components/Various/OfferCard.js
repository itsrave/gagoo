import React, {Component} from 'react';
import { Row, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faDollarSign, faMapMarkerAlt, faWrench} from "@fortawesome/free-solid-svg-icons";
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from "react-router-dom";
import '../Css/AdListItem.css'
import path from "../../api";
import axios from 'axios';
import { getStandardAjaxConfig } from "../User/UserFunctions";

class OfferCard extends Component {
  constructor(props) {
    super(props);
    this.deleteOffer = this.deleteOffer.bind(this);
  }

  renderCategories() {
    let categories = this.props.categories.map((category) => category.name);
    return categories.filter(Boolean).join(' > ');
  }

  componentDidMount() {
    this.renderCategories()
  }

  acceptedLink() {
    //console.log("accepted: " + this.props.accepted );
    return this.props.accepted ?
      <LinkContainer to={`/offerpage/${this.props.publicId}`}>
        <Link to={'/offerpage'}><Card.Title>{this.props.title}</Card.Title></Link>
      </LinkContainer>
      :
      <Card.Title>[Niezaakceptowana] {this.props.title}</Card.Title>;
  }

  imageLink() {
    return this.props.accepted ?
      <LinkContainer to={`/offerpage/${this.props.publicId}`}>
        <Col lg={4} className="offer-image offer-image-fit">
          <img
            className="d-block mx-auto img-fluid carousel-image"
            src={path + 'upload/offer-imgs/' + this.props.photos[0]}
            alt={"Zdjęcie oferty"}
          />
        </Col>
      </LinkContainer>
      :
      <Col lg={4} className="offer-image offer-image-fit" style={{cursor: "default"}}>
        <img
          className="d-block mx-auto img-fluid carousel-image"
          src={path + 'upload/offer-imgs/' + this.props.photos[0]}
          alt={"Zdjęcie oferty"}
        />
      </Col>;
  }

  getTitle() {
    return this.props.accepted ? "" : "To ogłoszenie czeka na zaakceptowanie przez administrację.";
  }

  renderDeleteButton() {
    return (this.props.removalPossibility === true)
      ?
      <Card.Text>
        <Button variant="danger" onClick={this.deleteOffer}>Usuń ogłoszenie</Button>
      </Card.Text>
      :
      null;
  }

  deleteOffer() {
    if (!confirm('Czy na pewno chcesz usunąć to ogłoszenie?')) {
      return;
    }

    axios
      .delete(
        `${path}api/offer/delete/${this.props.publicId}`,
        getStandardAjaxConfig(this.props.token)
      )
      .then(response => {
        // console.log(response.data);
        alert(response.data.output);
        this.props.onRemove();
      })
      .catch(error => {
        if (error.data.error) {
          alert(error.data.error);
        }
        console.log(error);
      });
  }

  render() {
    return (
      <Card className="my-2" title={this.getTitle()}>
        <Row className='no-gutters'>
          {this.imageLink()}
          <Col lg={8}>
            <Card.Body>
              {this.acceptedLink()}
              <Card.Text><FontAwesomeIcon icon={faDollarSign}/> {this.props.price}zł</Card.Text>
              <Card.Text className="text-muted">{this.renderCategories()}</Card.Text>
              {this.renderDeleteButton()}
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
