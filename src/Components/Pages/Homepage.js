import React, {Component} from 'react';
import {Container, Jumbotron} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Cards from "../Various/Cards";

class Homepage extends Component {
  render() {
    return (
        <>
        <Jumbotron fluid>
          <Container>
            <h1>Części</h1>
            <p>
              Mamy wszystko do twojego gruchota aby wieś tunning był jeszcze lepszy.
              Musi być full tunning ~ revolt
            </p>
            <p>
              <Button variant="primary">Przeglądaj ogłoszenia</Button>
            </p>
          </Container>
        </Jumbotron>
          <Cards />
          </>
    );
  }
}

export default Homepage;
