import React, {Component} from 'react';
import {Button, ButtonGroup, DropdownButton, Dropdown} from "react-bootstrap";

class SortBy extends Component {
  constructor(props) {
    super(props);
    this.handleSortOrder = this.handleSortOrder.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
    this.state = {
      orderText: 'Rosnąco'
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      let order;
      if (this.props.order === 'desc') {
        order = 'Malejąco'
      }
      if (this.props.order === 'asc') {
        order = 'Rosnąco'
      }
      this.setState({orderText: order, order: this.props.order});
    }
  }
  handleSortBy(e) {
    this.setState({sortBy: e.target.value});
    this.props.onSortChange(e.target.value, this.props.order);
  }
  handleSortOrder(e) {
    let order;
    if (e.target.text === 'Malejąco') {
      order = 'desc'
    }
    if (e.target.text === 'Rosnąco') {
      order = 'asc'
    }
    this.setState({orderText: e.target.text, order: order});
    this.props.onSortChange(this.props.sort, order);
  }
  render() {
    return (
        <ButtonGroup aria-label="Basic example">
          <Button onClick={this.handleSortBy} active={this.props.sort === 'date'} value='date' variant="primary">Data</Button>
          <Button onClick={this.handleSortBy} active={this.props.sort === 'price'} value='price' variant="primary">Cena</Button>
          <DropdownButton as={ButtonGroup} title={this.state.orderText} variant='info' id="bg-nested-dropdown">
            <Dropdown.Item  onClick={this.handleSortOrder}>Malejąco</Dropdown.Item>
            <Dropdown.Item onClick={this.handleSortOrder}>Rosnąco</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
    );
  }
}

export default SortBy;
