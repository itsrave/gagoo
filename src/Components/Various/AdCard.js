import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

class AdCard extends Component {
  render() {
    return (
        <Link to='/offerpage'>
          <Card>
          <Card.Img variant="top" src="https://i.picsum.photos/id/737/260/160.jpg"/>
          <Card.Body>
            <Card.Title>Uturbiony golf3 tdi 1.6</Card.Title>
            <Card.Text>
              4500zł
            </Card.Text>
          </Card.Body>
        </Card>
        </Link>
    );
  }
}

export default AdCard;
