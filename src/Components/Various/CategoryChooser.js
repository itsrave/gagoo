import React, {Component} from 'react';
import Container from "react-bootstrap/Container";

class CategoryChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: {
        name: 'Komputery',
        uniqueId: 'f97a0f8793b39a1f672752c74615517b',
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
    }
  }

  componentDidMount () {
  }
  renderCategories = () => {
    this.state.cats.map((category) => {
      return <li>{category.name}</li>
    })
  };
  render() {
    return (
        <Container fluid>
          kate
          <ul>
            {this.renderCategories}
          </ul>
        </Container>
    );
  }
}

export default CategoryChooser;
