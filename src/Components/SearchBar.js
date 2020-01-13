import React, {Component} from 'react';
import {Container, Form, InputGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './SearchBar.css'
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends Component {
  render() {
    return (
        <Container className='search-bar my-3'>
          <Form className='search-form'>
            <Form.Row className='justify-content-md-center'>
              <Col xs={4}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control className="mr-sm-2" placeholder='Czego szukasz?'/>
                </InputGroup>
              </Col>
              <Col xs={3}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faMapMarkedAlt} /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control className="mr-sm-2" placeholder='Lokalizacja'/>
                </InputGroup>
              </Col>
              <Col xs={1}>
                <Button variant="info">Szukaj</Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
    );
  }
}

export default SearchBar;
