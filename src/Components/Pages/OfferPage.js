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

class OfferPage extends Component {
  render() {
    return (
        <Container className="pb-3">
          <Row>
            <Col md={8}>
              <Card>
                <Card.Header className="text-muted">Kategoria > Subkategoria</Card.Header>
                <Card.Img variant="top" src="https://img.wiocha.pl/images/6/1/61fbc7d82d70364cd347c238f1d13b0f.jpg"/>
                <Card.Body>
                  <Card.Title as="h4">Uturbiony golf3 tdi 1.6</Card.Title>
                  <Card.Text as="h5"><FontAwesomeIcon icon={faDollarSign} /> 4500zł</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Row>
                    <Col md={3}><FontAwesomeIcon icon={faMapMarkerAlt}/> Miastko</Col>
                    <Col md={3}><FontAwesomeIcon icon={faClock}/> Wczoraj</Col>
                    <Col md={3}><FontAwesomeIcon icon={faWrench}/> Nowy</Col>
                    <Col md={3}><FontAwesomeIcon icon={faInfo}/> 2312321321</Col>
                  </Row>
                </Card.Footer>
                <Card.Body>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vehicula lacus id placerat sodales. Nulla pellentesque velit quis sapien tincidunt, in faucibus dui volutpat. Donec bibendum laoreet nibh, aliquet consectetur tellus faucibus sed. Nulla venenatis libero a velit fermentum, a volutpat ante bibendum. Sed et hendrerit elit, eget porta neque. Praesent arcu libero, interdum eget velit sit amet, varius imperdiet enim. Vivamus bibendum condimentum elementum. In et urna lobortis, accumsan nibh et, condimentum sapien.

                    Pellentesque feugiat cursus auctor. Nam at accumsan orci, ac vulputate quam. Sed risus libero, faucibus ac laoreet a, interdum sit amet diam. Sed nec sem ut orci ornare mollis. Aliquam at interdum lectus, mattis malesuada risus. Aliquam elementum eleifend felis at tincidunt. Praesent consectetur malesuada risus interdum bibendum. Nunc congue felis lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed suscipit nibh sed lobortis aliquam. Praesent suscipit et magna eu porta.

                    Phasellus eu luctus dolor. Phasellus tincidunt ipsum eu nibh aliquam, quis lobortis massa porta. Nunc sed erat posuere elit laoreet rutrum. Ut sollicitudin, metus quis ornare dignissim, metus ante euismod nibh, viverra tincidunt erat ligula quis magna. Maecenas at nibh a quam sagittis ornare eu in magna. Nulla vestibulum, dui dignissim gravida auctor, magna tellus sagittis sapien, et imperdiet augue tortor sit amet orci. Ut pretium maximus suscipit.

                    Mauris tincidunt tristique lacus malesuada finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin faucibus volutpat ex quis fringilla. Aliquam sollicitudin placerat suscipit. In a pretium eros. Curabitur in bibendum erat. Nam ut sem non nibh luctus cursus in ut ligula. Donec quam turpis, feugiat eu rutrum ac, suscipit porta est. Praesent sapien turpis, auctor sit amet nunc in, pharetra egestas lectus. Morbi posuere tellus sit amet varius tincidunt.

                    Praesent venenatis ligula ac est lobortis, et consectetur urna consequat. Phasellus lacinia augue nec ipsum scelerisque, eget cursus nisl luctus. Vestibulum at ante faucibus, luctus ipsum eu, viverra libero. Maecenas dignissim ligula in lacus convallis, a venenatis elit porttitor. Praesent blandit tellus sit amet rhoncus bibendum. Vestibulum aliquet sagittis gravida. Praesent orci erat, viverra mollis tincidunt sed, accumsan a ipsum. Phasellus non leo eget enim egestas mattis.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <UserCardAdpage />
              <Container className={'pt-2'}>
                <Button variant="primary">Pokaż ogłoszenia użytkownika</Button>
              </Container>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default OfferPage;
