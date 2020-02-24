import React, {Component} from 'react';
import OfferToAccept from "../Admin/OfferToAccept";
import {Container, Jumbotron} from "react-bootstrap";
import OfferCard from "../Various/OfferCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import path from "../../api";
import Button from "react-bootstrap/Button";
import PaginationComponent from "../Various/PaginationComponent";
import Loading from "../Various/Loading";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      pagination: {},
      noOffers: false,
      isLoading: false,
      page: this.props.match.params.page
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.getOffers(this.props.match.params.page);
    }
  }
  componentDidMount() {
    this.getOffers(this.props.match.params.page);
  }
  getOffers(page) {
    this.setState({isLoading: true});
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .get(path + 'api/offer/unaccepted/' + page,{ headers: { Authorization: AuthStr } })
        .then(res => {
          this.setState({offers: res.data.offers, pagination: res.data.pagination, isLoading: false});
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.setState({noOffers: true, isLoading: false});
          } else {
            this.setState({isLoading: false});
            console.log(err);
          }
        });
  }
  renderOffers() {
    let offers = this.state.offers;
    return offers.map((offer, index) => (
      <OfferToAccept
        key={index}
        token={this.props.token}
        title={offer.title}
        created={offer.created}
        description={offer.description}
        userData={offer.owner}
        categories={offer.categoryHierarchy}
        photos={offer.photos}
        price={offer.price}
        condition={offer.condition}
        publicId={offer.publicIdentifier}
      />
    ))
  }
  render() {
    return (
        <Container>
          <Row sm={10}>
            <Col>
              {this.state.noOffers &&
              <Container className={'text-center'}>
                <h1>Brak ofert do zakceptowania</h1>
              </Container>}
              {this.renderOffers()}
            </Col>
          </Row>
          <Row>
            <Col>
              <PaginationComponent link={'/adminpanel/'} current={this.state.pagination.currentPage} pageCount={this.state.pagination.pageCount} />
            </Col>
          </Row>
          {this.state.isLoading && <Loading full={true}/>}
        </Container>
    );
  }
}

export default AdminPage;
