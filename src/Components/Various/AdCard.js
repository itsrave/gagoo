import React, {Component} from 'react';
import Card from "react-bootstrap/Card";

class AdCard extends Component {
  render() {
    return (
        <Card>
          <Card.Img variant="top" src="https://i.picsum.photos/id/737/260/160.jpg" />
          <Card.Body>
            <Card.Title>Uturbiony golf3 tdi 1.6</Card.Title>
            <Card.Text>
              4500zł
            </Card.Text>
          </Card.Body>
        </Card>
    );
  }
}

export default AdCard;
