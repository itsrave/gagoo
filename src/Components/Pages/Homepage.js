import React, { Component } from 'react';
import { Container, Jumbotron, Col } from "react-bootstrap";
import Cards from "../Various/Cards";
import axios from 'axios';
import path from "../../api";
import ParentCategories from "../Various/ParentCategories";
import '../Css/Additional.css';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parentCategories: [],
      categoriesDownloaded: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    if (this.state.categoriesDownloaded) {
      return;
    }

    axios.get(path + 'public-api/category/get-parent-categories')
      .then(response => {
        this.setState({ parentCategories: response.data['categories'], categoriesDownloaded: true })
      })
      .catch(error => {
        console.log(error);
        this.setState({ categoriesDownloaded: true, errorMessage: error.data });
      });
  }

  renderParentCategories() {
    return this.state.categoriesDownloaded && this.state.parentCategories === []
      ? this.state.errorMessage === '' ? <div>Nie dodano kategorii</div> : <div>{ this.state.errorMessage }</div>
      : <ParentCategories categories={this.state.parentCategories} />;
  }

  render() {
    return (
      <>
        <div className="homePage__categories">
          <Container>
            <Col xs={12}>
              {this.renderParentCategories()}
            </Col>
          </Container>
        </div>
        <Cards />
      </>
    );
  }
}

export default Homepage;
