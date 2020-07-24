import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, Button, Card, Carousel, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import path from "../../api";
import Loading from "../Various/Loading";
import My404Component from "./My404Component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faDollarSign, faMapMarkerAlt, faWrench} from "@fortawesome/free-solid-svg-icons";
import UserCardAdpage from "../User/UserCardAdpage";
import {getStandardAjaxConfig} from "../User/UserFunctions";

class AdminOfferPage extends Component {
  constructor(props) {
    super(props);

    this.acceptOffer = this.acceptOffer.bind(this);
    this.deleteOffer = this.deleteOffer.bind(this);

    this.state = {
      offer: [],
      owner: { publicIdentifier: '' },
      isLoading: true,
      offerFound: true,
      showToast: false,
      toastHeader: '',
      toastBody: '',
    };
  }

  renderImages() {
    return (this.state.offer.photos === undefined)
      ? <img className="d-block mx-auto img-fluid carousel-image" src="/img/loading.png" alt='Ładowanie' />
      : this.state.offer.photos.map((photo, index) => (
        <Carousel.Item className={'text-center'} key={index}>
          <img
            className="d-block mx-auto img-fluid carousel-image"
            src={path + 'upload/offer-imgs/' + photo}
            alt={"Zdjęcie oferty nr " + (index + 1)}
          />
        </Carousel.Item>
      ));
  }

  componentDidMount() {
    this.getOffer()
  }

  getOffer() {
    this.setState({isLoading: true});
    axios
      .get(
        `${path}api/offer/${this.props.match.params.offerPublicIdentifier}`,
        getStandardAjaxConfig(this.props.token)
      )
      .then(res => {
        let categories = res.data.categoryHierarchy.map((category) => category.name);
        let offer = res.data;
        offer.description = offer.description.split("<br />").map((t ,i) => {return <p key={i}>{t}</p>});
        offer.categoryHierarchy = categories.filter(Boolean).join(' > ');
        this.setState({ offer: offer, owner: offer.owner, isLoading: false, offerFound: true });
      })
      .catch(err => {
        switch (err.response.status) {
          case 404:
            this.setState({ noOffers: true, isLoading: false, offerFound: false });
            break;
          default: this.setState({isLoading: false});
        }
      });
  }

  acceptOffer() {
    this.props.history.goBack();
  }

  deleteOffer() {
    this.props.history.goBack();
    alert('delete offer');
  }

  render() {
    if (this.state.isLoading) {
      return (<div>...</div>);
    }

    if (this.state.offerFound) {
      return (
        <>
          <Container className="pb-3">
            <Row>
              <Col md={12}>
                <Breadcrumb active="true">
                  <Container>
                    <Row>
                      <Col md={3}><Button variant={"success"} block onClick={this.acceptOffer}>Akceptuj</Button></Col>
                      <Col md={3}><Button variant={"danger"} block onClick={this.deleteOffer}>Usuń</Button></Col>
                    </Row>
                  </Container>
                </Breadcrumb>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Card>
                  <Card.Header className="text-muted">{this.state.offer.categoryHierarchy}</Card.Header>
                  <Carousel>
                    {this.renderImages()}
                  </Carousel>
                  <Card.Body>
                    <Card.Title as="h4">{this.state.offer.title}</Card.Title>
                    <Card.Text as="h5"><FontAwesomeIcon icon={faDollarSign} /> {this.state.offer.price}zł</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <Row>
                      <Col className="py-1" md={3}><FontAwesomeIcon icon={faMapMarkerAlt}/> {this.state.owner.city}</Col>
                      <Col className="py-1" md={3}><FontAwesomeIcon icon={faClock}/> {this.state.offer.created}</Col>
                      <Col className="py-1" md={3}><FontAwesomeIcon icon={faWrench}/> {this.state.offer.condition}</Col>
                    </Row>
                  </Card.Footer>
                  <Card.Body>
                    {this.state.offer.description}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <UserCardAdpage user={this.state.owner} />
                <Container className={'pt-2'}>
                  <Row>
                    <Col className="text-center">
                      <Link className="btn btn-primary" to={`/useroffers/${this.state.owner.publicIdentifier}/1`}>
                        Pokaż ogłoszenia użytkownika
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            {this.state.isLoading && <Loading full={true}/>}
          </Container>
        </>
      );
    } else {
      return (<My404Component />);
    }
  }
}

export default AdminOfferPage;
