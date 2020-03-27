import React, {Component} from 'react';
import axios from "axios";
import path from "../../api";
import queryString from "query-string";
import OfferCard from "../Various/OfferCard";
import {Breadcrumb, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SortBy from "../Various/SortBy";
import CategoryChooser from "../Various/CategoryChooser";
import PaginationComponent from "../Various/PaginationComponent";
import Loading from "../Various/Loading";

class UserOffersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      offers: []
    }
  }
  componentDidMount() {
    this.getOffers(this.props.match.params.page);
  }
  getOffers(page) {
    this.setState({isLoading: true});
    axios
        .get(path + `public-api/offer/user/${this.props.match.params.userID}/page/${this.props.match.params.page}`)
        .then(res => {
          this.setState({offers: res.data.offers, isLoading: false});
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.setState({noOffers: true, isLoading: false});
          } else {
            this.setState({isLoading: false});
          }
        });
  }
  refresh() {
    this.setState({offers: [], noOffers: false});
    let query = this.state.query;
    this.props.history.push(`/offers/${query.orderBy}/${query.strategy}${query.categoryUid === undefined ? '' : '/' + query.categoryUid}/1`)
  }
  renderOffers() {
    let offers = this.state.offers;
    return offers.map((offer, index) => (
        <OfferCard
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
          <Row>
            <Col>
              {this.state.categoryChosen !== '' && <Breadcrumb>
                <Breadcrumb.Item active>{this.state.categoryChosen}</Breadcrumb.Item>
              </Breadcrumb>}
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Button variant="primary" onClick={this.handleModal}>
                Wybierz kategorie
              </Button>
            </Col>
            <Col />
            <Col sm={4} className="text-right">
              <SortBy order={this.props.match.params.order} sort={this.props.match.params.sortBy} onSortChange={this.handleSortChange} />
            </Col>
          </Row>
          <CategoryChooser category={this.handleCategory} opened={this.state.isModalOpen} toggleModal={this.handleModal} />
          <Row sm={10}>
            <Col>
              {this.state.noOffers &&
              <Container className={'text-center'}>
                <h1>Brak ofert</h1>
              </Container>}
              {this.renderOffers()}
            </Col>
          </Row>
          <Row>
            <Col>
              <PaginationComponent link={`/offer/user/${this.props.match.params.userID}/page/${this.props.match.params.page}`} current={this.state.pagination.currentPage} pageCount={this.state.pagination.pageCount} />
            </Col>
          </Row>
          {this.state.isLoading && <Loading full={true}/>}
        </Container>
    );
  }
}

export default UserOffersPage;
