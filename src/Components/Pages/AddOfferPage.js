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
import { getStandardAjaxConfig, isUserDataEmpty, isUserDataEqual } from "../User/UserFunctions";

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
      successMessages: [],
      categoryChosen: '',
      error: {},
      formData: {
        title: undefined,
        description: undefined,
        price: undefined,
        condition: '',
        categoryUid: undefined,
        photos: []
      },
      pictures: [],
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
      successMessages: {},
      failure: false,
      validateMessage: false,
      success: false,
      isModalOpen: false,
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

  // TODO: naprawa submita
  handleSubmit = (e) => {
    e.preventDefault();
    const userData = this.state.userData;

    this.getInitialWarningState();
    this.setState({isLoading: true});

    this.submitUserData();

    this.submitPhotos().then(() => this.submitOffer());
  };

  submitOffer() {
    axios
      .post(
        `${path}api/offer/add`,
        this.state.formData,
        getStandardAjaxConfig(this.props.token)
      )
      .then(res => {
        this.setState({successMessages: res.data, isLoading: false});
        this.handleMessages()
      })
      .catch(err => {
        if (err.response.status === 406) {
          this.setState({errors: err.response.data, isLoading: false})
        }
        this.setState({errors: err.response.data, isLoading: false});
        this.handleMessages()
      });
  }

  submitPhoto(picture) {
    const AuthStr = 'Bearer ' + this.props.token;
    let data = new FormData();
    data.append('image', picture, picture.fileName);

    return axios
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
  }

  submitPhotos() {
    let formData = this.state.formData;
    formData.photos = [];
    this.setState({formData: formData});
    return Promise.all(this.state.pictures.map(this.submitPhoto.bind(this)));
  }

  submitUserData() {
    const userData = this.state.userData;

    if (isUserDataEmpty(userData)) {
      this.setState({ validateMessage: true, isLoading: false });
      return;
    }

    axios
      .patch(`${path}api/user/update`,
        userData,
        getStandardAjaxConfig(this.props.token)
      )
      .then(res => {

      })
      .catch(err => {
        this.setState({isLoading: false, failure: true});
      });
  }

  handleMessages() {
    let errors = this.state.errors;
    let success = this.state.successMessages;
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
    if (success.output !== undefined) {
      this.setState({success: true});
    }
  }

  handlePictures = (pic) => {
    this.setState({pictures: pic});
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
            <Form onSubmit={this.handleSubmit}>
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
                </Form.Label>
                <Row>
                  <Col>
                    <Form.Control plaintext readOnly defaultValue={this.state.categoryChosen} />
                  </Col>
                </Row>
                {this.state.categoryError &&
                <Alert variant='warning' dismissible onClose={() => this.setState({categoryError: false})}>{this.state.errors.category}</Alert>}
                <CategoryChooser category={this.handleCategory} opened={this.state.isModalOpen} toggleModal={this.handleModal} />
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Form.Label>Cena</Form.Label>
                  <Row>
                    <Col xs={10}><Form.Control type="number" name={'price'} onChange={this.handleFormChange} /></Col>
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
                  <Col md={7}><Form.Control required type="text" placeholder="Wpisz miejscowość" name={'city'} onChange={this.handleUserDataChange} value={this.state.userData.city} />
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
              {this.state.success &&
              <Alert variant='success' dismissible onClose={() => this.setState({success: false})}>{this.state.successMessages.output + ' ' + this.state.successMessages.offerPublicIdentifier}</Alert>}
              <Button variant="primary" type={'submit'}>
                Dodaj ogłoszenie
              </Button>
              {this.state.isLoading && <Loading />}
            </Form>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default AddOfferPage;
