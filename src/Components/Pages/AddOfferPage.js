import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";

class AddOfferPage extends Component {
  render() {
    return (
        <Container className="my-3">
          <Row>
            <Col />
            <Col md={8}>
              <Form>
                <Form.Group>
                  <Form.Label><h3>Tytuł</h3></Form.Label>
                  <Form.Control type="text" placeholder="Wpisz tytuł (maksymalnie 80 znaków)" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Kategoria</Form.Label>
                  <Form.Control type="text" placeholder="Kategoria" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cena</Form.Label>
                  <Form.Control type="text" />zł
                </Form.Group>
                <Form.Group>
                  <Form.Label>Opis</Form.Label>
                  <Form.Control as="textarea" rows="4" placeholder="Wpisz opis" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Dodaj ogłoszenie
                </Button>
              </Form>
            </Col>
            <Col />
          </Row>
        </Container>
    );
  }
}

export default AddOfferPage;
