import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import path from "../../api";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LinkContainer} from 'react-router-bootstrap'
import '../Css/AdListItem.css'

const imageStyle = {
  display: 'block',
  maxHeight: '100%',
  maxWidth : '100%',
  objectFit: 'cover'
};
class OfferCardHomepage extends Component {
  render() {
    return (
          <Card>
            <LinkContainer className="offer-image" to={`/offerpage/${this.props.data.publicIdentifier}`}>
              <Card.Img style={imageStyle} variant="top" src={path + 'upload/offer-imgs/' + this.props.data.photos[0]}/>
            </LinkContainer>
            <Card.Body>
              <Link to={`/offerpage/${this.props.data.publicIdentifier}`}>
              <Card.Title>{this.props.data.title}</Card.Title>
              </Link>
            <Card.Text><FontAwesomeIcon icon={faDollarSign} /> {this.props.data.price}zł</Card.Text>
          </Card.Body>
        </Card>
    );
  }
}

export default OfferCardHomepage;
