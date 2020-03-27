import React, {Component} from 'react';
import {Container, Jumbotron} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Cards from "../Various/Cards";
import {Link} from "react-router-dom";

class Homepage extends Component {
  render() {
    return (
        <>
        <Jumbotron fluid>
          <Container>
            <h1>Lorem ipsum</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis nisl ut porttitor rhoncus. Nam sit amet mollis urna, ac feugiat mauris. Duis fermentum posuere iaculis.
            </p>
            <p>
              <Link className="btn btn-primary" to='/offers/date/asc/1'>Przeglądaj oferty</Link>
            </p>
          </Container>
        </Jumbotron>
          <Cards />
          </>
    );
  }
}

export default Homepage;
