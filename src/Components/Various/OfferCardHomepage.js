import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import path from "../../api";

class OfferCardHomepage extends Component {
  render() {
    return (
        <Link to='/offerpage'>
          <Card>
          <Card.Img variant="top" src={path + 'upload/offer-imgs/' + this.props.data.photos[0]}/>
          <Card.Body>
            <Card.Title>{this.props.data.title}</Card.Title>
            <Card.Text> {this.props.data.price}</Card.Text>
          </Card.Body>
        </Card>
        </Link>
    );
  }
}

export default OfferCardHomepage;
