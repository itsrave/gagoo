import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import './FooterComponent.css'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class FooterComponent extends Component {
  // TODO Better footer
  render() {
    return (
        <footer className="footer">
          <Container fluid className='bg-dark'>
            <div className='links justify-content-md-center'>
              <Row>
                <Col>
                  <ul className='text-md-left'>
                    <li>Strona główna</li>
                    <li>Ogłoszenia</li>
                    <li>Kategorie</li>
                    <li>O nas</li>
                    <li>Kontakt</li>
                  </ul>
                </Col>
                <Col>
                  <ul className='text-md-right'>
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
