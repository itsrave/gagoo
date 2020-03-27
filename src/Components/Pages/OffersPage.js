import React, {Component} from 'react';
import {Breadcrumb, Container} from "react-bootstrap";
import OfferCard from "../Various/OfferCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import path from "../../api";
import PaginationComponent from "../Various/PaginationComponent";
import Loading from "../Various/Loading";
import CategoryChooser from "../Various/CategoryChooser";
import Button from "react-bootstrap/Button";
import SortBy from "../Various/SortBy";
import queryString from "query-string";

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
      categoryChosen: '',
      page: this.props.match.params.page,
      sortBy: this.props.match.params.sortBy,
      order: this.props.match.params.order,
      redirect: false,
      query: {
        subject: '',
        categoryUid: this.props.match.params.category,
        orderBy: this.props.match.params.sortBy,
        strategy: this.props.match.params.order,
        page: this.props.match.params.page,
      }
    }
  }
  getInitialState() {
    this.setState({
      categoryChosen: '',});
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.getInitialState();
      this.getOffers(this.props.match.params.page);
    }
  }
  componentDidMount() {
    this.getInitialState();
    this.getOffers(this.props.match.params.page);
  }
  getOffers(page) {
    this.setState({isLoading: true});
    const values = queryString.parse(this.props.location.search);
    let query = {
      subject: values.subject,
      city: values.city,
      categoryUid: this.props.match.params.category,
      orderBy: this.props.match.params.sortBy,
      strategy: this.props.match.params.order,
      page: this.props.match.params.page,
    };
    axios
        .post(path + 'public-api/offer/search/' + page, query)
        .then(res => {
          if (this.state.categoryChosen === '' && this.props.match.params.category !== undefined) {
            let category = res.data.offers[0].categoryHierarchy.map((category) => category.name);
            let categoryNames = category.filter(Boolean).join(' > ');
            this.setState({offers: res.data.offers, categoryChosen: categoryNames, pagination: res.data.pagination, isLoading: false});
          } else {
            this.setState({offers: res.data.offers, pagination: res.data.pagination, isLoading: false});
          }
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.setState({noOffers: true, isLoading: false});
          } else {
            this.setState({isLoading: false});
          }
        });
  }
  handleModal() {
    this.setState({isModalOpen: !this.state.isModalOpen});
  }
  refresh() {
    this.setState({offers: [], noOffers: false});
    let query = this.state.query;
    this.props.history.push(`/offers/${query.orderBy}/${query.strategy}${query.categoryUid === undefined ? '' : '/' + query.categoryUid}/1`)
  }
  handleCategory = (id, names) => {
    let query = this.state.query;
    query.categoryUid = id;
    let category = names.filter(Boolean).join(' > ');
    this.setState({query: query, categoryChosen: category});
    this.refresh()
  };
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
  handleSortChange(sortBy, order) {
    let query = this.state.query;
    query.strategy = order;
    query.orderBy = sortBy;
    this.setState({query: query});
    this.refresh()
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
              <PaginationComponent link={`/offers/${this.state.query.orderBy}/${this.state.query.strategy}${this.state.query.categoryUid === undefined ? '' : '/' + this.state.query.categoryUid}/`} current={this.state.pagination.currentPage} pageCount={this.state.pagination.pageCount} />
            </Col>
          </Row>
          {this.state.isLoading && <Loading full={true}/>}
        </Container>
    );
  }
}

export default OffersPage;
