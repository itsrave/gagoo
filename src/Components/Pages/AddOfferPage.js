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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { arrayToString } from "../Various/VariousFunctions";
import '../Css/Additional.css';
import OfferToast from "../Various/OfferToast";

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);

    // Jakie elementy mają być w Quillu
    this.toolbar = [
      ['bold', 'italic', 'underline'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
    ];

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
      showToast: false,
      error: {},
      formData: {
        title: '',
        description: '',
        price: '',
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
      },
      newUserData: {
        email: '',
        username: '',
        name: '',
        phoneNumber: '',
        city: '',
        state: '',
        zipCode: '',
      },
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
    // ten kod nie ma sensu
    this.setState({isLoading: true});
    this.getUserData();
    // this.setState({isLoading: false});
  }

  // TODO avatar upload request in get data settings
  getUserData() {
    axios
      .get(
        `${path}api/user/get-data`,
        getStandardAjaxConfig(this.props.token)
      )
      .then(res => {
        const data = res.data;
        this.setState({
          userData: Object.assign({}, data),
          newUserData: Object.assign({}, data),
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({isLoading: false});
        console.log(err);
      });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const userData = this.state.userData;
    const newUserData = this.state.newUserData;

    this.getInitialWarningState();
    this.setState({ isLoading: true });

    if (!isUserDataEqual(userData, newUserData)) {
      // console.log('Aktualizacja danych');
      await this.submitUserData();
    }

    // console.log('A teraz reszta');
    this.submitPhotos().then(() => this.submitOffer());
  };

  submitUserData() {
    const userData = this.state.newUserData;

    if (isUserDataEmpty(userData)) {
      this.setState({ validateMessage: true, isLoading: false });
      return;
    }

    return new Promise((resolve, reject) => {
      axios
        .patch(`${path}api/user/update`,
          userData,
          getStandardAjaxConfig(this.props.token)
        )
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          this.setState({ isLoading: false, failure: true, showToast: true });
          reject(err);
        });
    });
  }

  submitOffer() {
    const formData = Object.assign({ }, this.state.formData);

    axios
      .post(
        `${path}api/offer/add`,
        {
          title: DOMPurify.sanitize(formData.title),
          description: DOMPurify.sanitize(formData.description),
          price: DOMPurify.sanitize(formData.price),
          condition: DOMPurify.sanitize(formData.condition),
          categoryUid: DOMPurify.sanitize(formData.categoryUid),
          photos: formData.photos
        },
        getStandardAjaxConfig(this.props.token)
      )
      .then(res => {
        this.setState({
          successMessages: res.data,
          isLoading: false
        });

        this.handleMessages();
        this.resetForm();
      })
      .catch(err => {
        // if (err.response.status === 406) {
        //   this.setState({ errors: err.response.data, isLoading: false});
        // }
        this.setState({ errors: err.response.data, isLoading: false, showToast: true });
        this.handleMessages();
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

  handleQuillChange(text) {
    const formData = this.state.formData;
    formData['description'] = text;

    this.setState({
      formData: formData,
    });
  }

  handleUserDataChange = (event) => {
    const newUserData = this.state.newUserData;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    newUserData[name] = value;

    this.setState({
      newUserData: newUserData
    });
  };

  resetForm() {
    this.setState({
      formData: {
        title: '',
        description: '',
        price: '',
        condition: '',
        categoryUid: '',
        photos: []
      },
      failure: false,
      validateMessage: false,
      categoryError: false,
      titleError: false,
      descriptionError: false,
      priceError: false,
      conditionError: false,
      errors: [],
      categoryChosen: '',
      error: {},
    });
  }

  render() {
    return (
      <Container className="my-3">
        <Row>
          <Col />
          <Col md={8}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label><h3>Tytuł</h3></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wpisz tytuł (maksymalnie 80 znaków)"
                  name="title"
                  onChange={this.handleFormChange}
                  value={this.state.formData.title}
                />
                {this.state.titleError &&
                <Alert
                  variant='warning'
                  dismissible
                  onClose={() => this.setState({ titleError: false })}
                >
                  {arrayToString(this.state.errors.title)}
                </Alert>}
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
                <Alert
                  variant='warning'
                  dismissible
                  onClose={() => this.setState({categoryError: false})}
                >
                  {arrayToString(this.state.errors.category)}
                </Alert>}
                <CategoryChooser category={this.handleCategory} opened={this.state.isModalOpen} toggleModal={this.handleModal} />
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Form.Label>Cena</Form.Label>
                  <Row>
                    <Col xs={10}>
                      <Form.Control
                        min={0}
                        type="number"
                        name="price"
                        onChange={this.handleFormChange}
                        value={this.state.formData.price}
                      />
                    </Col>
                    <Col xs={2}><div className="pln-text"> zł</div></Col>
                  </Row>
                  {this.state.priceError &&
                  <Alert
                    variant='warning'
                    dismissible
                    onClose={() => this.setState({priceError: false})}
                  >
                    {arrayToString(this.state.errors.price)}
                  </Alert>}
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
                  <Alert
                    variant='warning'
                    dismissible
                    onClose={() => this.setState({conditionError: false})}
                  >
                    {arrayToString(this.state.errors.condition)}
                  </Alert>}
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label><h3>Opis</h3></Form.Label>
                {/*<Form.Control*/}
                {/*  as="textarea"*/}
                {/*  rows="4"*/}
                {/*  placeholder="Wpisz opis"*/}
                {/*  name={'description'}*/}
                {/*  onChange={this.handleFormChange}*/}
                {/*  value={this.state.formData.description}*/}
                {/*/>*/}
                <ReactQuill
                  value={this.state.formData.description}
                  onChange={this.handleQuillChange}
                  name="description"
                  placeholder="Wpisz opis"
                  modules={ { toolbar: this.toolbar } }
                />
                {this.state.descriptionError &&
                <Alert
                  variant='warning'
                  dismissible
                  onClose={() => this.setState({descriptionError: false})}
                >
                  {arrayToString(this.state.errors.description)}
                </Alert>}
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
                  <Col md={7}><Form.Control required type="text" placeholder="Wpisz imię" name={'name'} onChange={this.handleUserDataChange} value={this.state.newUserData.name} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPhone">
                  <Form.Label column md={5}>Numer telefonu: </Form.Label>
                  <Col md={7}><Form.Control type="tel" placeholder="Wpisz numer telefonu" name={'phoneNumber'} onChange={this.handleUserDataChange} value={this.state.newUserData.phoneNumber} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formCity">
                  <Form.Label column md={5}>Miasto: </Form.Label>
                  <Col md={7}><Form.Control required type="text" placeholder="Wpisz miejscowość" name={'city'} onChange={this.handleUserDataChange} value={this.state.newUserData.city} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formState">
                  <Form.Label column md={5}>Województwo: </Form.Label>
                  <Col md={7}>
                    <Form.Control as="select" name={'state'} onChange={this.handleUserDataChange} value={this.state.newUserData.state} >
                      <option value={''}>Wybierz województwo</option>
                      {states.map((state, i) => <option key={i}>{state}</option>)}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formZipCode">
                  <Form.Label column md={5}>Kod pocztowy: </Form.Label>
                  <Col md={7}><Form.Control type="text" placeholder="00-000" name={'zipCode'} onChange={this.handleUserDataChange} value={this.state.newUserData.zipCode} />
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
              <Alert
                variant='success'
                dismissible onClose={() => this.setState({success: false})}
              >
                {this.state.successMessages.output}
              </Alert>}
              <Button variant="primary" type={'submit'}>
                Dodaj ogłoszenie
              </Button>
              {this.state.isLoading && <Loading />}
            </Form>
          </Col>
          <Col />
        </Row>
        <OfferToast
          show={this.state.showToast}
          onClose={() => { this.setState({ showToast: false })}}
        />
      </Container>
    );
  }
}

export default AddOfferPage;
