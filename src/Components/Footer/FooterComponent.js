import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import './FooterComponent.css'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class FooterComponent extends Component {
  render() {
    return (
        <footer className="footer">
          <Container fluid>
            <div className='links'>
              <Row>
                <Col md={2}>
                  <ul>
                    <li>Strona główna</li>
                    <li>Ogłoszenia</li>
                    <li>Kategorie</li>
                    <li>O nas</li>
                    <li>Kontakt</li>
                  </ul>
                </Col>
                <Col />
                <Col md={2}>
                  <ul>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Container>
        </footer>
    );
  }
}

export default FooterComponent;
