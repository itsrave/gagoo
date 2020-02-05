import React, {Component} from 'react';
import ListGroup from "react-bootstrap/ListGroup";

class CategoryItem extends Component {
  render() {
    return (
        <ListGroup.Item active={this.props.active} uniqueId={this.props.uniqueId} onClick={this.props.handleClick}>{this.props.name}</ListGroup.Item>
    );
  }
}

export default CategoryItem;
