import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import {Button, Carousel, OverlayTrigger, Popover, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faDollarSign, faMapMarkerAlt, faWrench} from "@fortawesome/free-solid-svg-icons";
import '../Css/AdListItem.css'
import {Link} from "react-router-dom";
import path from "../../api";
import Alert from "react-bootstrap/Alert";
import { acceptOffer, deleteOffer } from "./OfferFunctionsAdmin";

class OfferToAccept extends Component {
  constructor(props) {
    super(props);

    this.acceptOffer = this.acceptOffer.bind(this);
    this.deleteOffer = this.deleteOffer.bind(this);

    this.state = {
      successAccept: false,
      successMessage: '',
      error: false,
      errorMessage: 'Wystąpił błąd'
    }
  }

  renderImages() {
    return this.props.photos.map((photo, index) => (
      <Carousel.Item className={'text-center'} key={index}>
        <img
          className="d-block mx-auto img-fluid carousel-image"
          src={path + 'upload/offer-imgs/' + photo}
          alt={"Zdjęcie oferty nr " + (index+1)}
        />
      </Carousel.Item>
    ));
  }

  renderCategories() {
    let categories = this.props.categories.map((category) => category.name);
    return categories.filter(Boolean).join(' > ');
  }

  componentDidMount() {
    this.renderCategories()
  }

  acceptOffer() {
    acceptOffer(
      this.props.publicId,
      this.props.token,
      (result) => {
        this.setState({ successAccept: true, successMessage: result.data })
      },
      (error) => {
        alert(error);
        this.setState({ error: true });
      });
  }

  deleteOffer() {
    deleteOffer(
      this.props.publicId,
      this.props.token,
      (result) => {
        this.setState({ successAccept: true, successMessage: result.data })
      },
      (error) => {
        alert(error);
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <Card className="my-2">
        <Row className='no-gutters'>
          <Col lg={4}>
            <Carousel>
              {this.renderImages()}
            </Carousel>
          </Col>
          <Col lg={8}>
            <Card.Body>
              <Row>
                <Col sm={8}>
                  <Link to={`/admin/offer/${this.props.publicId}`}><Card.Title>{this.props.title}</Card.Title></Link>
                  <Card.Text><FontAwesomeIcon icon={faDollarSign}/> {this.props.price}zł</Card.Text>
                  <Card.Text className="text-muted">{this.renderCategories()}</Card.Text>
                </Col>
                <Col sm={4}>
                  <Row>
                    <Col className={'text-center my-1'}>
                      <Button
                        variant="success"
                        disabled={this.state.successAccept}
                        onClick={this.acceptOffer}
                        block
                      >
                        Akceptuj
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={'text-center my-1'}>
                      <Button
                        variant="danger"
                        disabled={this.state.successAccept}
                        onClick={this.deleteOffer}
                        block
                      >
                        Usuń
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={'text-center my-1'}>
                      <OverlayTrigger
                        trigger="click"
                        placement={'left'}
                        overlay={
                          <Popover id={`popover-positioned`}>
                            <Popover.Title as="h3">{'Dane użytkownika'}</Popover.Title>
                            <Popover.Content>
                              <img style={{objectFit: 'cover', width: '50px', height: '50px' }} alt={'Avatar'} className='rounded-circle' src={path + "upload/av/" + this.props.userData.avatar} /><br/>
                              <strong>Email: </strong> {this.props.userData.email} <br/>
                              <strong>Imię: </strong> {this.props.userData.name} <br/>
                              <strong>Miasto: </strong> {this.props.userData.city} <br/>
                              <strong>Kod pocztowy: </strong> {this.props.userData.zipCode} <br/>
                              <strong>Województwo: </strong> {this.props.userData.state} <br/>
                            </Popover.Content>
                          </Popover>
                        }
                      >
                        <Button variant="primary" block>Zobacz dane użytkownika</Button>
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                {this.state.successAccept &&
                <Alert variant='success'>{this.state.successMessage}</Alert>}
                {this.state.error &&
                <Alert variant='danger'>{this.state.errorMessage}</Alert>}
              </Row>
            </Card.Body>
          </Col>
        </Row>
        <Card.Footer className="text-muted">
          <Row>
            <Col className="py-1" md={3}><FontAwesomeIcon icon={faMapMarkerAlt}/> {this.props.userData.city}</Col>
            <Col className="py-1" md={3}><FontAwesomeIcon icon={faClock}/> {this.props.created}</Col>
            <Col className="py-1" md={3}><FontAwesomeIcon icon={faWrench}/> {this.props.condition}</Col>
            {/*<Col className="py-1" md={3}><FontAwesomeIcon icon={faInfo}/> {this.props.publicId}</Col>*/}
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}

export default OfferToAccept;
