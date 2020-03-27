import React, {Component} from 'react';
import {Card, Col, Container} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWrench, faDollarSign, faMapMarkerAlt, faClock, faInfo} from "@fortawesome/free-solid-svg-icons";
import UserCard from "../User/UserCard";
import UserCardAdpage from "../User/UserCardAdpage";
import Button from "react-bootstrap/Button";
import queryString from "query-string";
import axios from "axios";
import path from "../../api";
import Loading from "../Various/Loading";
import {Link} from "react-router-dom";

class OfferPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: [],
      owner: [],
      isLoading: false,
    }
  }
  renderImages() {
    if (this.state.offer.photos === undefined) {
      return <img className="d-block mx-auto img-fluid carousel-image" src="/img/loading.png" alt='Ładowanie'/>
    } else {
      return this.state.offer.photos.map((photo, index) => (
          <Carousel.Item className={'text-center'} key={index}>
            <img
                className="d-block mx-auto img-fluid carousel-image"
                src={path + 'upload/offer-imgs/' + photo}
                alt={"Zdjęcie oferty nr " + (index+1)}
            />
          </Carousel.Item>
      ))
    }
  }
  componentDidMount() {
    this.getOffers()
  }
  getOffers() {
    this.setState({isLoading: true});
    axios
        .get(path + 'public-api/offer/' + this.props.match.params.offerId)
        .then(res => {
          let categories = res.data.categoryHierarchy.map((category) => category.name);
          let offer = res.data;
          offer.description = offer.description.split("<br />").map((t ,i) => {return <p key={i}>{t}</p>});
          offer.categoryHierarchy = categories.filter(Boolean).join(' > ');
          this.setState({offer: offer, owner: offer.owner, isLoading: false});
          console.log(res)
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.setState({noOffers: true, isLoading: false});
          } else {
            this.setState({isLoading: false});
          }
        });
  }
  render() {
    return (
        <Container className="pb-3">
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
                  <Card.Text>
                    {this.state.offer.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <UserCardAdpage user={this.state.owner} />
              <Container className={'pt-2'}>
                <Row>
                  <Col className="text-center">
                    <Link className="btn btn-primary" to={`/useroffers/:userID:page/`}>Pokaż ogłoszenia użytkownika</Link>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          {this.state.isLoading && <Loading full={true}/>}
        </Container>
    );
  }
}

export default OfferPage;
