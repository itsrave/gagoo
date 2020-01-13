import React, {Component} from 'react';
import {CardColumns, Container} from "react-bootstrap";
import AdCard from "./AdCard";

class Cards extends Component {
  render() {
    return (
        <Container>
          <CardColumns>
            <AdCard />
            <AdCard />
            <AdCard />
            <AdCard />
            <AdCard />
            <AdCard />
            <AdCard />
            <AdCard />
            <AdCard />
            <AdCard />
          </CardColumns>
        </Container>
    );
  }
}

export default Cards;
