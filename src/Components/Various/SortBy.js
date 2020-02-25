import React, {Component} from 'react';
import {Button, ButtonGroup, DropdownButton, Dropdown} from "react-bootstrap";

class SortBy extends Component {
  constructor(props) {
    super(props);
    this.handleSortOrder = this.handleSortOrder.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
    this.state = {
      order: this.props.initialOrder,
      sortBy: this.props.initialSortBy,
      orderText: 'Rosnąco'
    }
  }

  handleSortBy(e) {
    this.setState({sortBy: e.target.value});
    this.props.onSortChange(e.target.value, this.state.order);
  }
  handleSortOrder(e) {
    let order;
    if (e.target.text === 'Malejąco') {
      order = 'descending'
    }
    if (e.target.text === 'Rosnąco') {
      order = 'ascending'
    }
    this.setState({orderText: e.target.text, order: order});
    this.props.onSortChange(this.state.sortBy, order);
  }
  render() {
    return (
        <ButtonGroup aria-label="Basic example">
          <Button onClick={this.handleSortBy} active={this.state.sortBy === 'date'} value='date' variant="primary">Data</Button>
          <Button onClick={this.handleSortBy} active={this.state.sortBy === 'price'} value='price' variant="primary">Cena</Button>
          <DropdownButton as={ButtonGroup} title={this.state.orderText} variant='info' id="bg-nested-dropdown">
            <Dropdown.Item  onClick={this.handleSortOrder}>Malejąco</Dropdown.Item>
            <Dropdown.Item onClick={this.handleSortOrder}>Rosnąco</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
    );
  }
}

export default SortBy;
