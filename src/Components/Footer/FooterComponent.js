import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import '../Css/FooterComponent.css'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Link} from "react-router-dom";

class FooterComponent extends Component {
  render() {
    return (
        <footer className="footer">
          <Jumbotron fluid style={{
            margin: 0,
            padding: 0
          }}>
              <Container className=''>
                <Row>
                  <Col className='nopadding nomargin'>
                    <ul className='nopadding nopadding text-md-left'>
                      <li><Link to={'/'}>Strona główna</Link></li>
                      <li><Link to={'/offers/date/asc/1'}>Ogłoszenia</Link></li>
                      <li>O nas</li>
                      <li>Regulamin</li>
                      <li>Kontakt</li>
                    </ul>
                  </Col>
                  <Col className='nopadding nomargin'>
                    <ul className='nopadding text-md-right'>
                      <li>Copyright Gagoo 2020</li>
                    </ul>
                  </Col>
                </Row>
              </Container>
          </Jumbotron>
        </footer>
    );
  }
}

export default FooterComponent;
