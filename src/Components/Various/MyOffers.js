import React, {Component} from 'react';
import axios from "axios";
import path from "../../api";
import OfferCard from "./OfferCard";
import {Breadcrumb, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PaginationComponent from "./PaginationComponent";
import Loading from "./Loading";
import {withRouter} from "react-router-dom";

class MyOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      offers: [],
      pagination: {},
    }
  }
  componentDidMount() {
    this.getOffers();
  }
  getOffers() {
    const AuthStr = 'Bearer ' + this.props.token;
    this.setState({isLoading: true});
    axios
        .get(path + `api/offer/current-user/page/${this.props.match.params.page}`, { headers: { Authorization: AuthStr }})
        .then(res => {
          this.setState({offers: res.data.offers, pagination: res.data.pagination, isLoading: false});
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.setState({noOffers: true, isLoading: false});
          } else {
            this.setState({isLoading: false});
          }
        });
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
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    {this.state.categoryChosen !== '' && <Breadcrumb>*/}
          {/*      <Breadcrumb.Item active>{this.state.categoryChosen}</Breadcrumb.Item>*/}
          {/*    </Breadcrumb>}*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={4}>*/}
          {/*    <Button variant="primary" onClick={this.handleModal}>*/}
          {/*      Wybierz kategorie*/}
          {/*    </Button>*/}
          {/*  </Col>*/}
          {/*  <Col />*/}
          {/*  <Col sm={4} className="text-right">*/}
          {/*    <SortBy order={this.props.match.params.order} sort={this.props.match.params.sortBy} onSortChange={this.handleSortChange} />*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<CategoryChooser category={this.handleCategory} opened={this.state.isModalOpen} toggleModal={this.handleModal} />*/}
          <Row sm={10}>
            <Col>
              {this.state.noOffers &&
              <Container className={'text-center my-3'}>
                <h1>Brak ofert</h1>
              </Container>}
              {this.renderOffers()}
            </Col>
          </Row>
          <Row>
            <Col>
              <PaginationComponent link={`/account/myoffers/`} current={this.props.match.params.page} pageCount={this.state.pagination.pageCount} />
            </Col>
          </Row>
          {this.state.isLoading && <Loading full={true}/>}
        </Container>
    );
  }
}

export default withRouter(MyOffers);
