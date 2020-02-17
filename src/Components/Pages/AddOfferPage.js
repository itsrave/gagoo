import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import FileUploader from "../Various/FileUploader";
import CategoryChooser from "../Various/CategoryChooser";
import axios from "axios";
import path from "../../api";
import FormData from "form-data";
import Loading from "../Various/Loading";
import Alert from "react-bootstrap/Alert";

const states = [
  'dolnośląskie',
  'kujawsko-pomorskie',
  'lubelskie',
  'lubuskie',
  'łódzkie',
  'małopolskie',
  'mazowieckie',
  'opolskie',
  'podkarpackie',
  'podlaskie',
  'pomorskie',
  'śląskie',
  'świętokrzyskie',
  'warmińsko-mazurskie',
  'wielkopolskie',
  'zachodniopomorskie'
];

class AddOfferPage extends Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      validateMessage: false,
      success: false,
      isModalOpen: false,
      isLoading: false,
      categoryChosen: '',
      pictures: [],
      formData: {
        title: undefined,
        description: undefined,
        price: undefined,
        condition: undefined,
        categoryUid: undefined,
        photos: ["15e4672604768d1581675104.jpeg"]
      },
      userData: {
        email: '',
        username: '',
        name: '',
        phoneNumber: '',
        city: '',
        state: '',
        zipCode: '',
      }
    }
  }
  componentDidMount() {
    this.setState({isLoading: true});
    this.getUserData();
    this.setState({isLoading: false});

  }
  getUserData() {
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .get(path + 'api/user/get-data',{ headers: { Authorization: AuthStr } })
        .then(res => this.setState({userData: res.data, isLoading: false}))
        .catch(err => {
          this.setState({isLoading: false});
          console.log(err);
        });
  }
  handleSubmit = () => {
    this.setState({isLoading: true});
    // this.submitPhotos();
    // this.submitUserData();
    this.submitOffer();
    this.setState({isLoading: false});
  };
  submitOffer() {
    let formData = this.state.formData;
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .post(path + 'api/offer/add', formData,{ headers: { Authorization: AuthStr, } })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response.data);
          this.setState({isLoading: false});
        });
  }
  submitPhotos() {
    let data = this.state.pictures;
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .post(path + 'api/offer-photo/upload', data,{ headers: { Authorization: AuthStr, } })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
          this.setState({isLoading: false});
        });
    }
  submitUserData() {
    this.setState({
      validateMessage: false,
      success: false,
    });
    const userData = this.state.userData;
    if (userData.name === ''){
      this.setState({validateMessage: true, isLoading: false});
      return
    }
    if (userData.phoneNumber === ''){
      this.setState({validateMessage: true, isLoading: false});
      return
    }
    if (userData.city === ''){
      this.setState({validateMessage: true, isLoading: false});
      return
    }
    if (userData.state === ''){
      this.setState({validateMessage: true, isLoading: false});
      return
    }
    if (userData.zipCode === ''){
      this.setState({validateMessage: true, isLoading: false});
    }
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .patch(path + 'api/user/update', userData, { headers: { Authorization: AuthStr } })
        .then(res => {
          this.setState({isLoading: false, success: true});
        })
        .catch(err => {
          this.setState({isLoading: false});
        })
  }
  handlePictures = (pic) => {
    this.setState({pictures: [...pic]})
  };
  handleModal() {
    this.setState({isModalOpen: !this.state.isModalOpen});
  }
  handleCategory = (id, names) => {
    let form = this.state.formData;
    form.categoryUid = id;
    let category = names.filter(Boolean).join(' > ');
    this.setState({formData: form, categoryChosen: category})
  };
  handleFormChange = (event) => {
    const formData = this.state.formData;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    formData[name] = value;
    if (name === 'price')
      formData[name] = parseInt(value, 10);
    this.setState({
      formData: formData
    });
  };
  handleUserDataChange = (event) => {
    const userData = this.state.userData;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    userData[name] = value;
    this.setState({
      userData: userData
    });
  };
  render() {
    return (
        <Container className="my-3">
          <Row>
            <Col />
            <Col md={8}>
              <Form>
                <Form.Group>
                  <Form.Label><h3>Tytuł</h3></Form.Label>
                  <Form.Control type="text" placeholder="Wpisz tytuł (maksymalnie 80 znaków)" name={'title'} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <h3>Kategoria</h3>
                    <Button variant="primary" onClick={this.handleModal}>
                      Wybierz kategorie
                    </Button>
                  </Form.Label>
                  <Row>
                    <Col>
                      <Form.Control plaintext readOnly defaultValue={this.state.categoryChosen} />
                    </Col>
                  </Row>
                  <CategoryChooser category={this.handleCategory} opened={this.state.isModalOpen} toggleModal={this.handleModal} />
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>
                    <Form.Label>Cena</Form.Label>
                    <Row>
                      <Col xs={10}><Form.Control type="text" name={'price'} onChange={this.handleFormChange} /></Col>
                      <Col xs={2} ><Form.Label>zł</Form.Label></Col>
                    </Row>
                  </Col>
                  <Col>
                    <Form.Label>Stan</Form.Label>
                    <Form.Control as="select" name={'condition'} onChange={this.handleFormChange} >
                      <option value="" selected>Wybierz stan przedmiotu</option>
                      <option>Nowe</option>
                      <option>Używane</option>
                      <option>Uszkodzone</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label><h3>Opis</h3></Form.Label>
                  <Form.Control as="textarea" rows="4" placeholder="Wpisz opis" name={'description'} onChange={this.handleFormChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label><h3>Zdjęcia</h3></Form.Label>
                  <FileUploader handlePictures={this.handlePictures} />
                  <Form.Text className="text-muted">
                    Oferty ze zdjęciami otrzymują nawet trzy razy więcej odpowiedzi.
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label><h3>Twoje dane</h3></Form.Label>
                  <Form.Group as={Row} controlId="formName">
                    <Form.Label column md={5}>Imię: </Form.Label>
                    <Col md={7}><Form.Control required type="text" placeholder="Wpisz imię" name={'name'} onChange={this.handleUserDataChange} value={this.state.userData.name} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPhone">
                    <Form.Label column md={5}>Numer telefonu: </Form.Label>
                    <Col md={7}><Form.Control type="tel" placeholder="Wpisz numer telefonu" name={'phoneNumber'} onChange={this.handleUserDataChange} value={this.state.userData.phoneNumber} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formCity">
                    <Form.Label column md={5}>Miasto: </Form.Label>
                    <Col md={7}><Form.Control type="text" placeholder="Wpisz miejscowość" name={'city'} onChange={this.handleUserDataChange} value={this.state.userData.city} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formState">
                    <Form.Label column md={5}>Województwo: </Form.Label>
                    <Col md={7}>
                      <Form.Control as="select" name={'state'} placeholder="Wpisz województwo" onChange={this.handleChange} value={this.state.userData.state} >
                        <option value="" selected>Wybierz województwo</option>
                        {states.map((state, i) => <option key={i}>{state}</option>)}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formZipCode">
                    <Form.Label column md={5}>Kod pocztowy: </Form.Label>
                    <Col md={7}><Form.Control type="text" placeholder="00-000" name={'zipCode'} onChange={this.handleUserDataChange} value={this.state.userData.zipCode} />
                    </Col>
                  </Form.Group>
                  <Form.Text className="text-muted">
                    Twoje dane zostaną zapisane w ustawieniach, możesz je później zmienić.
                  </Form.Text>
                  {this.state.validateMessage &&
                  <Alert variant='warning' dismissible onClose={() => this.setState({validateMessage: false})}>Pola z danymi nie mogą być puste.</Alert>}
                  {this.state.success &&
                  <Alert variant='success' dismissible onClose={() => this.setState({success: false})}>Zaktualizowano dane pomyślnie.</Alert>}

                </Form.Group>
                <Button variant="primary" onClick={this.handleSubmit}>
                  Dodaj ogłoszenie
                </Button>
                {this.state.isLoading && <Loading/>}
              </Form>
            </Col>
            <Col />
          </Row>
        </Container>
    );
  }
}

export default AddOfferPage;
