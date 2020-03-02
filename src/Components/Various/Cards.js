import React, {Component} from 'react';
import {CardColumns, Container} from "react-bootstrap";
import OfferCardHomepage from "./OfferCardHomepage";
import axios from "axios";
import path from "../../api";
import Col from "react-bootstrap/Col";
import Loading from "./Loading";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.renderOffers = this.renderOffers.bind(this);
    this.state = {
      offers: [],
      noOffers: false,
      unexpectedError: false,
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.getOffers();
    }
  }
  componentDidMount() {
    this.getOffers();
  }
  getOffers() {
    this.setState({isLoading: true});
    axios
        .get(path + 'offer/newest/')
        .then(res => {
          this.setState({offers: res.data.offers, isLoading: false});
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.setState({noOffers: true, isLoading: false});
          } else {
            this.setState({unexpectedError: true, isLoading: false});
            console.log(err);
          }
        });
  }
  renderOffers() {
    let offers = this.state.offers;
    this.state.offers.map((offer, key) => (
        <OfferCardHomepage key={key} data={offer} />
    ))
  }
  render() {
    return (
        <Container>
          <h2>Najnowsze ogłoszenia</h2>
          <CardColumns>
            {this.state.noOffers &&
            <Container className={'text-center'}>
              <h1>Brak ofert</h1>
            </Container>}
            {this.state.unexpectedError &&
            <Container className={'text-center'}>
              <h1>Nieznany błąd</h1>
            </Container>}
            {this.renderOffers()}
          </CardColumns>
          {this.state.isLoading && <Loading full={true}/>}
        </Container>
    );
  }
}

export default Cards;
