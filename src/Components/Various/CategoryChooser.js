import React, {Component} from 'react';
import CategoryItem from "./CategoryItem";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import path from "../../api";

const leftPadding = {
  paddingLeft: '15px'
};

class CategoryChooser extends Component {
  constructor(props) {
    super(props);

    this.renderCategories = this.renderCategories.bind(this);
    this.handleMainClick = this.handleMainClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubClick = this.handleSubClick.bind(this);
    this.state = {
      cats: [],
      mainSelectedName: '',
      mainSelectedId: '',
      selectedName: '',
      selectedId: '',
      subSelectedName: '',
      subSelectedId: ''
    }
  }
  getInitialState() {
    this.setState({
      mainSelectedName: '',
      mainSelectedId: '',
      selectedName: '',
      selectedId: '',
      subSelectedName: '',
      subSelectedId: ''
    })
  }
  componentDidMount() {
    this.getCategories();
  }
  getCategories() {
    axios
        .get(path + 'category/get-all')
        .then(res => this.setState({cats: res.data, isLoading: false}))
        .catch(err => {
          this.setState({isLoading: false});
          console.log(err);
        })
  }
  handleMainClick(e) {
    this.getInitialState();
    const id = e.target.getAttribute('uniqueid');
    const categories = this.state.cats;
    const name = categories.filter(obj => {
      return obj.uniqueId === id
    })[0].name;
    this.setState({mainSelectedId: id, mainSelectedName: name})
  }
  handleClick(e) {
    const id = e.target.getAttribute('uniqueid');
    const categories = this.state.cats;
    const name = categories.filter(obj => {
      return obj.uniqueId === this.state.mainSelectedId
    })[0].children.filter(obj => {
      return obj.uniqueId === id
    })[0].name;
    this.setState({selectedId: id, selectedName: name})
  }
  handleSubClick(e) {
    const id = e.target.getAttribute('uniqueid');
    const categories = this.state.cats;
    const name = categories.filter(obj => {
      return obj.uniqueId === this.state.mainSelectedId
    })[0].children.filter(obj => {
      return obj.uniqueId === this.state.selectedId
    })[0].children.filter(obj => {
      return obj.uniqueId === id
    })[0].name;
    this.setState({subSelectedId: id, subSelectedName: name})
  }
  renderMainCategories() {
    const categories = this.state.cats;
    return categories.map((category, index) => (
        <CategoryItem active={category.uniqueId === this.state.mainSelectedId} key={index} name={category.name} uniqueId={category.uniqueId} handleClick={this.handleMainClick}/>
    ))
  };
  renderCategories() {
    if (this.state.mainSelectedId === '') {
      return
    } else {
      const categories = this.state.cats;
      const children = categories.filter(obj => {
        return obj.uniqueId === this.state.mainSelectedId
      })[0].children;
      return children.map((category, index) => (
          <CategoryItem active={category.uniqueId === this.state.selectedId} key={index} name={category.name} uniqueId={category.uniqueId} handleClick={this.handleClick}/>
      ))
    }
  };
  renderSubCategories() {
    if (this.state.selectedId === '') {
      return
    } else {
      const categories = this.state.cats;
      const children = categories.filter(obj => {
        return obj.uniqueId === this.state.mainSelectedId
      })[0].children.filter(obj => {
        return obj.uniqueId === this.state.selectedId
      })[0].children;
      return children.map((category, index) => (
          <CategoryItem active={category.uniqueId === this.state.subSelectedId} key={index} name={category.name} uniqueId={category.uniqueId} handleClick={this.handleSubClick}/>
      ))
    }
  };

  render() {
    return (
          <Modal show={this.props.opened} onHide={this.props.toggleModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                  <Col md={4}>
                    Wybierz kategorie
                  </Col>
                  <Col md={4}>
                    {this.state.mainSelectedName}
                  </Col>
                  <Col md={4}>
                    {this.state.selectedName}
                  </Col>
            </Modal.Header>
            <Modal.Body as={Row}>
                <ListGroup style={leftPadding} as={Col} md={4}>
                  {this.renderMainCategories()}
                </ListGroup>
                <ListGroup as={Col} md={4}>
                  {this.renderCategories()}
                </ListGroup>
                <ListGroup as={Col} md={4}>
                  {this.renderSubCategories()}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.toggleModal}>
                Zamknij
              </Button>
              <Button variant="primary"  onClick={this.props.toggleModal}>
                Wybierz
              </Button>
            </Modal.Footer>
          </Modal>
    );
  }
}

export default CategoryChooser;
