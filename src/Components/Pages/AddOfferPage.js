import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import FileUploader from "../Various/FileUploader";
import CategoryChooser from "../Various/CategoryChooser";

class AddOfferPage extends Component {
  getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }
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

                <Form.Group as={Row}>
                  <Col>
                    <Form.Label>Kategoria</Form.Label>
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <CategoryChooser />
                <Form.Group as={Row}>
                  <Col>
                    <Form.Label>Cena</Form.Label>
                    <Row>
                      <Col md={11}><Form.Control type="text" /></Col>
                      <Form.Label>zł</Form.Label>
                    </Row>
                  </Col>
                  <Col>
                    <Form.Label>Stan</Form.Label>
                    <Form.Control as="select">
                      <option>Używane</option>
                      <option>Nowe</option>
                      <option>Uszkodzone</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label><h3>Opis</h3></Form.Label>
                  <Form.Control as="textarea" rows="4" placeholder="Wpisz opis" />
                </Form.Group>
                <Form.Group>
                  <Form.Label><h3>Zdjęcia</h3></Form.Label>
                  <FileUploader />
                  <Form.Text className="text-muted">
                    Oferty ze zdjęciami otrzymują nawet trzy razy więcej odpowiedzi.
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label><h3>Twoje dane</h3></Form.Label>
                  <Form.Control type="text" placeholder="Wpisz tytuł (maksymalnie 80 znaków)" />
                  <Form.Text className="text-muted">
                    Twoje dane zostaną zapisane w ustawieniach, możesz je później zmienić.
                  </Form.Text>

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
