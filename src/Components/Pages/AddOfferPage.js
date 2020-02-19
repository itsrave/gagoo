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
let photos = [];

class AddOfferPage extends Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      failure: false,
      validateMessage: false,
      isModalOpen: false,
      isLoading: false,
      categoryError: false,
      titleError: false,
      descriptionError: false,
      priceError: false,
      conditionError: false,
      errors: [],
      categoryChosen: '',
      pictures: [],
      error: {},
      formData: {
        title: undefined,
        description: undefined,
        price: undefined,
        condition: '',
        categoryUid: undefined,
        photos: []
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
  getInitialWarningState() {
    this.setState({
      failure: false,
      validateMessage: false,
      success: false,
      isModalOpen: false,
      isLoading: false,
      categoryError: false,
      titleError: false,
      descriptionError: false,
      priceError: false,
      conditionError: false,
      errors: [],
    })
  }
  componentDidMount() {
    this.setState({isLoading: true});
    this.getUserData();
    this.setState({isLoading: false});

  }
  // TODO avatar upload request in get data settings
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
    this.getInitialWarningState();
    this.setState({isLoading: true});
    this.submitUserData();
    this.submitPhotos();
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
          this.setState({errors: err.response.data, isLoading: false});
          this.handleErrors()
        });
  }
  submitPhotos() {
    photos.map((picture) => {
      let data = new FormData();
      data.append('image', picture, picture.fileName);
      const AuthStr = 'Bearer ' + this.props.token;
      axios
          .post(path + 'api/photo/upload', data,{ headers: { Authorization: AuthStr, } })
          .then(res => {
            let formData = this.state.formData;
            formData.photos.push(res.data[0]);
            this.setState({formData: formData})
          })
          .catch(err => {
            console.log(err.response.data);
            this.setState({failure: true, isLoading: false});
          });
    });
  }
  submitUserData() {
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
      return
    }
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .patch(path + 'api/user/update', userData, { headers: { Authorization: AuthStr } })
        .then(res => {
          this.setState({success: true});
        })
        .catch(err => {
          this.setState({isLoading: false, failure: true});
        })
  }
  handleErrors() {
    let errors = this.state.errors;
    if (errors.category !== undefined) {
      this.setState({categoryError: true});
    }
    if (errors.title !== undefined) {
      this.setState({titleError: true});
    }
    if (errors.description !== undefined) {
      this.setState({descriptionError: true});
    }
    if (errors.price !== undefined) {
      this.setState({priceError: true});
    }
    if (errors.condition !== undefined) {
      this.setState({conditionError: true});
    }
  }
  handlePictures = (pic) => {
    photos = pic;
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
                  {this.state.titleError &&
                  <Alert variant='warning' dismissible onClose={() => this.setState({titleError: false})}>{this.state.errors.title}</Alert>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    <h3>Kategoria</h3>
                    <Button variant="primary" onClick={this.handleModal}>
                      Wybierz kategorie
                    </Button>
                    {this.state.categoryError &&
                    <Alert variant='warning' dismissible onClose={() => this.setState({categoryError: false})}>{this.state.errors.category}</Alert>}
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
                    {this.state.priceError &&
                    <Alert variant='warning' dismissible onClose={() => this.setState({priceError: false})}>{this.state.errors.price}</Alert>}
                  </Col>
                  <Col>
                    <Form.Label>Stan</Form.Label>
                    <Form.Control as="select" name={'condition'} value={this.state.formData.condition} onChange={this.handleFormChange} >
                      <option value={''}>Wybierz stan przedmiotu</option>
                      <option>Nowy</option>
                      <option>Używany</option>
                      <option>Uszkodzony</option>
                    </Form.Control>
                    {this.state.conditionError &&
                    <Alert variant='warning' dismissible onClose={() => this.setState({conditionError: false})}>{this.state.errors.condition}</Alert>}
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label><h3>Opis</h3></Form.Label>
                  <Form.Control as="textarea" rows="4" placeholder="Wpisz opis" name={'description'} onChange={this.handleFormChange} />
                  {this.state.descriptionError &&
                  <Alert variant='warning' dismissible onClose={() => this.setState({descriptionError: false})}>{this.state.errors.description}</Alert>}
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
                      <Form.Control as="select" name={'state'} onChange={this.handleUserDataChange} value={this.state.userData.state} >
                        <option value={''}>Wybierz województwo</option>
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
                  {this.state.failure &&
                  <Alert variant='danger' dismissible onClose={() => this.setState({failure: false})}>Nieznany błąd, spróbuj ponownie później.</Alert>}
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
