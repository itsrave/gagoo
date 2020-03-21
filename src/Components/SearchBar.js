import React, {Component} from 'react';
import {Container, Form, InputGroup} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import './Css/SearchBar.css'
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Container className='search-bar my-3'>
          <Form className='search-form'>
            <Form.Row className='justify-content-md-center'>
              <Col md={4} className='my-1 my-md-0'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control className="mr-sm-2" name={'subject'} placeholder='Czego szukasz?'/>
                </InputGroup>
              </Col>
              <Col md={3} className='my-1 my-md-0'>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faMapMarkedAlt} /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control className="mr-sm-2" name={'city'} placeholder='Lokalizacja'/>
                </InputGroup>
              </Col>
              <Col md={1} className="text-center my-1 my-md-0">
                <Button variant="info" type={'submit'}>Szukaj</Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
    );
  }
}

export default withRouter(SearchBar);
