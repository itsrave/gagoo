import React, {Component} from 'react';
import OfferToAccept from "../Admin/OfferToAccept";
import {Container} from "react-bootstrap";
import AdListItem from "../Various/AdListItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import path from "../../api";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      pagination: {},
      page: '1'
    }
  }
  componentDidMount() {
    this.getOffers()
  }
  getOffers() {
    const AuthStr = 'Bearer ' + this.props.token;
    axios
        .get(path + 'api/offer/unaccepted/' + this.state.page,{ headers: { Authorization: AuthStr } })
        .then(res => {
          this.setState({offers: res.data.offers, pagination: res.data.pagination});
        })
        .catch(err => {
          console.log(err);
        });
  }
  renderOffers() {
    let offers = this.state.offers;
    return offers.map((offer, index) => (
      <OfferToAccept
        key={index}
        title={offer.title}
        description={offer.description}
        userData={offer.owner}
        // category={offer.category}
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
          {this.renderOffers()}
          <Row>
            <Col>
              <Pagination className={'justify-content-center'}>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default AdminPage;
