import React, {Component} from 'react';
import {Breadcrumb, Container} from "react-bootstrap";
import OfferCard from "../Various/OfferCard";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import path from "../../api";
import OfferToAccept from "../Admin/OfferToAccept";
import PaginationComponent from "../Various/PaginationComponent";
import Loading from "../Various/Loading";
import CategoryChooser from "../Various/CategoryChooser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SortBy from "../Various/SortBy";
import {Redirect} from "react-router-dom";

class OffersPage extends Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      offers: [],
      pagination: {},
      noOffers: false,
      isLoading: false,
      isModalOpen: false,
      categoryUid: '',
      categoryChosen: '',
      page: this.props.match.params.page,
      sortBy: this.props.match.params.sortBy,
      order: this.props.match.params.order,
      redirect: false,
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
    axios
        .get(path + 'offer/newest/' + page)
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
  handleModal() {
    this.setState({isModalOpen: !this.state.isModalOpen});
  }
  handleCategory = (id, names) => {
    let category = names.filter(Boolean).join(' > ');
    this.setState({categoryUid: id, categoryChosen: category})
  };
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
  handleSortChange(sortBy, order) {
    this.props.history.push(`/offers/${sortBy}/${order}`)
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
              <SortBy initialOrder={this.props.match.params.order} initialSortBy={this.props.match.params.sortBy} onSortChange={this.handleSortChange} />
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
              <PaginationComponent link={'/offers/'} current={this.state.pagination.currentPage} pageCount={this.state.pagination.pageCount} />
            </Col>
          </Row>
          {this.state.isLoading && <Loading full={true}/>}
        </Container>
    );
  }
}

export default OffersPage;
