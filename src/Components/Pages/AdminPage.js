import React, {Component} from 'react';
import OfferToAccept from "../Admin/OfferToAccept";
import {Alert, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import path from "../../api";
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
    };
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
    ));
  }
  render() {
    return (
      <Container>
        <Row sm={10}>
          <Col>
            {this.state.noOffers &&
            <Container className={'text-center my-3'}>
              <Alert dismissible variant={'info'}>
                Brak ofert do zaakceptowania
              </Alert>
            </Container>}
            {this.renderOffers()}
          </Col>
        </Row>
        <Row>
          <Col>
            <PaginationComponent
              link={'/adminpanel/'}
              current={this.state.pagination.currentPage}
              pageCount={this.state.pagination.pageCount}
            />
          </Col>
        </Row>
        {this.state.isLoading && <Loading full={true} />}
      </Container>
    );
  }
}

export default AdminPage;
