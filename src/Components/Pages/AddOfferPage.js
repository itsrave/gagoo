import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import FileUploader from "../Various/FileUploader";
import CategoryChooser from "../Various/CategoryChooser";

class AddOfferPage extends Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      isModalOpen: false,
      userData: {
        email: 'przykład@przykład.pl',
        username: 'Nazwa użytkownika',
        name: '',
        phoneNumber: '',
        city: '',
        state: '',
        zipCode: '',
      }
    }
  }
  handleModal() {
    this.setState({isModalOpen: !this.state.isModalOpen});
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

                <Form.Group>
                  <Form.Label>Kategoria</Form.Label>
                  <Row>
                    <Col>
                      <Button variant="primary" onClick={this.handleModal}>
                        Dodaj ogłoszenie
                      </Button>
                    </Col>
                  </Row>
                  <CategoryChooser opened={this.state.isModalOpen} toggleModal={this.handleModal} />
                </Form.Group>
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
                      <option>-</option>
                      <option>Nowe</option>
                      <option>Używane</option>
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
                  <Form.Group as={Row} controlId="formName">
                    <Form.Label column md={5}>Imię: </Form.Label>
                    <Col md={7}><Form.Control required type="text" placeholder="Wpisz imię" name={'name'} onChange={this.handleChange} value={this.state.userData.name} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPhone">
                    <Form.Label column md={5}>Numer telefonu: </Form.Label>
                    <Col md={7}><Form.Control type="tel" placeholder="Wpisz numer telefonu" name={'phoneNumber'} onChange={this.handleChange} value={this.state.userData.phoneNumber} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formCity">
                    <Form.Label column md={5}>Miasto: </Form.Label>
                    <Col md={7}><Form.Control type="text" placeholder="Wpisz miejscowość" name={'city'} onChange={this.handleChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formState">
                    <Form.Label column md={5}>Województwo: </Form.Label>
                    <Col md={7}><Form.Control type="text" placeholder="Wpisz województwo" name={'state'} onChange={this.handleChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formZipCode">
                    <Form.Label column md={5}>Kod pocztowy: </Form.Label>
                    <Col md={7}><Form.Control type="text" placeholder="00-000" name={'zipCode'} onChange={this.handleChange} />
                    </Col>
                  </Form.Group>
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
