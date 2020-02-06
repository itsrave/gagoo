import React, {Component} from 'react';
import CategoryItem from "./CategoryItem";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
      cats: [
        {
          name: 'Komputery',
          uniqueId: 'f97a0f8793b39a1f672752c74615517b',
          parentUniqueId: '',
          isMaster: true,
          isSlave: false,
          children: [
            {
              name: '1',
              uniqueId: '4fbca3a248840b04888a3f81b919d676',
              parentUniqueId: 'f97a0f8793b39a1f672752c74615517b',
              isMaster: true,
              isSlave: true,
              children: [
                {
                  name: 'Procesory',
                  uniqueId: '88d95359e1b77dbce7d5a4eaf09d6272',
                  parentUniqueId: '4fbca3a248840b04888a3f81b919d676',
                  isMaster: true,
                  isSlave: true,
                  children: [
                    {
                      name: 'Intel',
                      uniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                      parentUniqueId: '88d95359e1b77dbce7d5a4eaf09d6272',
                      isMaster: true,
                      isSlave: true,
                      children: [
                        {
                          name: 'Generacja 7',
                          uniqueId: '0bf662bb62baff728419d85a7d0bfffe',
                          parentUniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 8',
                          uniqueId: '65a7c504a5555b4092d610c4989f186b',
                          parentUniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 9',
                          uniqueId: '9b340acce7f879e512de54ac0fdd56c3',
                          parentUniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        }
                      ]
                    },
                    {
                      name: 'AMD',
                      uniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                      parentUniqueId: '88d95359e1b77dbce7d5a4eaf09d6272',
                      isMaster: true,
                      isSlave: true,
                      children: [
                        {
                          name: 'Generacja 1',
                          uniqueId: '20b56f64d3dd8fc66b7fa3c057b297bb',
                          parentUniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 2',
                          uniqueId: 'a37bbbfa29741666c500fb92d80ecfac',
                          parentUniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 3',
                          uniqueId: '69d62c48b8970836faf86dd697f80565',
                          parentUniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  name: '2',
                  uniqueId: 'a9f9c0b8920a9a55dde7bbfb25e92245',
                  parentUniqueId: '4fbca3a248840b04888a3f81b919d676',
                  isMaster: true,
                  isSlave: true,
                  children: [
                    {
                      name: 'Gigabyte',
                      uniqueId: 'ad7d2e18d6554d3899a29397e8995885',
                      parentUniqueId: 'a9f9c0b8920a9a55dde7bbfb25e92245',
                      isMaster: false,
                      isSlave: true,
                      children: []
                    },
                    {
                      name: 'MSI',
                      uniqueId: '4516426cf39edb7cb83469f8449ffbdd',
                      parentUniqueId: 'a9f9c0b8920a9a55dde7bbfb25e92245',
                      isMaster: false,
                      isSlave: true,
                      children: []
                    }
                  ]
                },
                {
                  name: 'Karty graficzne',
                  uniqueId: 'ae179ec8cffb0d864a155d5063615a03',
                  parentUniqueId: '4fbca3a248840b04888a3f81b919d676',
                  isMaster: false,
                  isSlave: true,
                  children: []
                }
              ]
            },
            {
              name: 'Gotowe zestawy',
              uniqueId: 'd2081cd1dec7611b9b09e07b5ac6b9ce',
              parentUniqueId: 'f97a0f8793b39a1f672752c74615517b',
              isMaster: false,
              isSlave: true,
              children: []
            },
            {
              name: 'Laptopy',
              uniqueId: 'ad52ee30a0e9642ed4a5191e7f568680',
              parentUniqueId: 'f97a0f8793b39a1f672752c74615517b',
              isMaster: false,
              isSlave: true,
              children: []
            }
          ]
        },
        {
          name: 'Komputery',
          uniqueId: '123',
          parentUniqueId: '',
          isMaster: true,
          isSlave: false,
          children: [
            {
              name: 'Podzespoły bazowe',
              uniqueId: '4fbca3a248840b04888a3f81b919d676',
              parentUniqueId: 'f97a0f8793b39a1f672752c74615517b',
              isMaster: true,
              isSlave: true,
              children: [
                {
                  name: 'Procesory',
                  uniqueId: '88d95359e1b77dbce7d5a4eaf09d6272',
                  parentUniqueId: '4fbca3a248840b04888a3f81b919d676',
                  isMaster: true,
                  isSlave: true,
                  children: [
                    {
                      name: 'Intel',
                      uniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                      parentUniqueId: '88d95359e1b77dbce7d5a4eaf09d6272',
                      isMaster: true,
                      isSlave: true,
                      children: [
                        {
                          name: 'Generacja 7',
                          uniqueId: '0bf662bb62baff728419d85a7d0bfffe',
                          parentUniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 8',
                          uniqueId: '65a7c504a5555b4092d610c4989f186b',
                          parentUniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 9',
                          uniqueId: '9b340acce7f879e512de54ac0fdd56c3',
                          parentUniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        }
                      ]
                    },
                    {
                      name: 'AMD',
                      uniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                      parentUniqueId: '88d95359e1b77dbce7d5a4eaf09d6272',
                      isMaster: true,
                      isSlave: true,
                      children: [
                        {
                          name: 'Generacja 1',
                          uniqueId: '20b56f64d3dd8fc66b7fa3c057b297bb',
                          parentUniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 2',
                          uniqueId: 'a37bbbfa29741666c500fb92d80ecfac',
                          parentUniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 3',
                          uniqueId: '69d62c48b8970836faf86dd697f80565',
                          parentUniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Płyty Główne',
                  uniqueId: 'a9f9c0b8920a9a55dde7bbfb25e92245',
                  parentUniqueId: '4fbca3a248840b04888a3f81b919d676',
                  isMaster: true,
                  isSlave: true,
                  children: [
                    {
                      name: 'Gigabyte',
                      uniqueId: 'ad7d2e18d6554d3899a29397e8995885',
                      parentUniqueId: 'a9f9c0b8920a9a55dde7bbfb25e92245',
                      isMaster: false,
                      isSlave: true,
                      children: []
                    },
                    {
                      name: 'MSI',
                      uniqueId: '4516426cf39edb7cb83469f8449ffbdd',
                      parentUniqueId: 'a9f9c0b8920a9a55dde7bbfb25e92245',
                      isMaster: false,
                      isSlave: true,
                      children: []
                    }
                  ]
                },
                {
                  name: 'Karty graficzne',
                  uniqueId: 'ae179ec8cffb0d864a155d5063615a03',
                  parentUniqueId: '4fbca3a248840b04888a3f81b919d676',
                  isMaster: false,
                  isSlave: true,
                  children: []
                }
              ]
            },
            {
              name: 'Gotowe zestawy',
              uniqueId: 'd2081cd1dec7611b9b09e07b5ac6b9ce',
              parentUniqueId: 'f97a0f8793b39a1f672752c74615517b',
              isMaster: false,
              isSlave: true,
              children: []
            },
            {
              name: 'Laptopy',
              uniqueId: 'ad52ee30a0e9642ed4a5191e7f568680',
              parentUniqueId: 'f97a0f8793b39a1f672752c74615517b',
              isMaster: false,
              isSlave: true,
              children: []
            }
          ]
        },
        {
          name: 'Komputery',
          uniqueId: 'f97a0f8793b39a3213211f672752c74615517b',
          parentUniqueId: '',
          isMaster: true,
          isSlave: false,
          children: [
            {
              name: 'Podzespoły bazowe',
              uniqueId: '4fbca3a248840b04888a3f81b919d676',
              parentUniqueId: 'f97a0f8793b39a1f672752c74615517b',
              isMaster: true,
              isSlave: true,
              children: [
                {
                  name: 'Procesory',
                  uniqueId: '88d95359e1b77dbce7d5a4eaf09d6272',
                  parentUniqueId: '4fbca3a248840b04888a3f81b919d676',
                  isMaster: true,
                  isSlave: true,
                  children: [
                    {
                      name: 'Intel',
                      uniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                      parentUniqueId: '88d95359e1b77dbce7d5a4eaf09d6272',
                      isMaster: true,
                      isSlave: true,
                      children: [
                        {
                          name: 'Generacja 7',
                          uniqueId: '0bf662bb62baff728419d85a7d0bfffe',
                          parentUniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 8',
                          uniqueId: '65a7c504a5555b4092d610c4989f186b',
                          parentUniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 9',
                          uniqueId: '9b340acce7f879e512de54ac0fdd56c3',
                          parentUniqueId: 'a9d07b0af8b1549a1c3332d43ef62523',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        }
                      ]
                    },
                    {
                      name: 'AMD',
                      uniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                      parentUniqueId: '88d95359e1b77dbce7d5a4eaf09d6272',
                      isMaster: true,
                      isSlave: true,
                      children: [
                        {
                          name: 'Generacja 1',
                          uniqueId: '20b56f64d3dd8fc66b7fa3c057b297bb',
                          parentUniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 2',
                          uniqueId: 'a37bbbfa29741666c500fb92d80ecfac',
                          parentUniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        },
                        {
                          name: 'Generacja 3',
                          uniqueId: '69d62c48b8970836faf86dd697f80565',
                          parentUniqueId: '21d751227cfc8193b3c0e49a458c4bf3',
                          isMaster: false,
                          isSlave: true,
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Płyty Główne',
                  uniqueId: 'a9f9c0b8920a9a55dde7bbfb25e92245',
                  parentUniqueId: '4fbca3a248840b04888a3f81b919d676',
                  isMaster: true,
                  isSlave: true,
                  children: [
                    {
                      name: 'Gigabyte',
                      uniqueId: 'ad7d2e18d6554d3899a29397e8995885',
                      parentUniqueId: 'a9f9c0b8920a9a55dde7bbfb25e92245',
                      isMaster: false,
                      isSlave: true,
                      children: []
                    },
                    {
                      name: 'MSI',
                      uniqueId: '4516426cf39edb7cb83469f8449ffbdd',
                      parentUniqueId: 'a9f9c0b8920a9a55dde7bbfb25e92245',
                      isMaster: false,
                      isSlave: true,
                      children: []
                    }
                  ]
                },
                {
                  name: 'Karty graficzne',
                  uniqueId: 'ae179ec8cffb0d864a155d5063615a03',
                  parentUniqueId: '4fbca3a248840b04888a3f81b919d676',
                  isMaster: false,
                  isSlave: true,
                  children: []
                }
              ]
            },
            {
              name: 'Gotowe zestawy',
              uniqueId: 'd2081cd1dec7611b9b09e07b5ac6b9ce',
              parentUniqueId: 'f97a0f8793b39a1f672752c74615517b',
              isMaster: false,
              isSlave: true,
              children: []
            },
            {
              name: 'Laptopy',
              uniqueId: 'ad52ee30a0e9642ed4a5191e7f568680',
              parentUniqueId: 'f97a0f8793b39a1f672752c74615517b',
              isMaster: false,
              isSlave: true,
              children: []
            }
          ]
        }
      ],
      mainSelectedName: '',
      mainSelectedId: '',
      selectedName: '',
      selectedId: '',
      subSelectedName: '',
      subSelectedId: ''
    }
  }
  handleMainClick(e) {
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
