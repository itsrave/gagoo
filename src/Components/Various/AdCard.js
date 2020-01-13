import React, {Component} from 'react';
import Card from "react-bootstrap/Card";

class AdCard extends Component {
  render() {
    return (
        <Card>
          <Card.Img variant="top" src="https://i.picsum.photos/id/737/260/160.jpg" />
          <Card.Body>
            <Card.Title>Card title that wraps to a new line</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
        </Card>
    );
  }
}

export default AdCard;
