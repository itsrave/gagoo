import React, {Component} from 'react';
import Pagination from "react-bootstrap/Pagination";
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap'

const pageArray = n => [...Array(n)].map((_, index) => index + 1);

class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      redirect: false
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      let x = pageArray(this.props.pageCount);
      this.setState({
        pages: x
      })
    }
  }
  componentDidMount() {
    let x = pageArray(this.props.pageCount);
    this.setState({
      pages: x
    })
  }
  renderPages() {
    let link = this.props.link;
    let pages = this.state.pages;
    let current = parseInt(this.props.current, 10);
    if (current === this.props.pageCount || current === (this.props.pageCount - 1) || current === (this.props.pageCount - 2)) {
      return (
          <>
            <LinkContainer to={link + 1}>
              <Pagination.Item active={1 === current}>
                1
              </Pagination.Item>
            </LinkContainer>
            <LinkContainer to={link + (this.props.pageCount - 3)}>
              <Pagination.Ellipsis />
            </LinkContainer>
            <LinkContainer to={link + (this.props.pageCount - 2)}>
              <Pagination.Item active={(this.props.pageCount - 2) === current}>
                {this.props.pageCount - 2}
              </Pagination.Item>
            </LinkContainer>
            <LinkContainer to={link + (this.props.pageCount - 1)}>
              <Pagination.Item active={(this.props.pageCount - 1) === current}>
                {this.props.pageCount - 1}
              </Pagination.Item>
            </LinkContainer>
            <LinkContainer to={link + this.props.pageCount}>
              <Pagination.Item active={this.props.pageCount === current}>
                {this.props.pageCount}
              </Pagination.Item>
            </LinkContainer>
          </>
      )
    }
    if (current > 10 && pages.length > 10) {
      return (
          <>
            <LinkContainer to={link + 1}>
              <Pagination.Item active={1 === current}>
                1
              </Pagination.Item>
            </LinkContainer>
            <LinkContainer to={link + (current - 3)}>
              <Pagination.Ellipsis />
            </LinkContainer>
            <LinkContainer to={link + (current - 2)}>
              <Pagination.Item>
                {current - 2}
              </Pagination.Item>
            </LinkContainer>
            <LinkContainer to={link + (current - 1)}>
              <Pagination.Item>
                {current - 1}
              </Pagination.Item>
            </LinkContainer>
            <LinkContainer to={link + current}>
              <Pagination.Item active={true}>
                {current}
              </Pagination.Item>
            </LinkContainer>
            <LinkContainer to={link + (current + 1)}>
              <Pagination.Item>
                {current + 1}
              </Pagination.Item>
            </LinkContainer>
            <LinkContainer to={link + (current + 2)}>
              <Pagination.Item>
                {current + 2}
              </Pagination.Item>
            </LinkContainer>
            <LinkContainer to={link + (current + 3)}>
              <Pagination.Ellipsis />
            </LinkContainer>
            <LinkContainer to={link + this.props.pageCount}>
              <Pagination.Item active={this.props.pageCount === current}>
                {this.props.pageCount}
              </Pagination.Item>
            </LinkContainer>
          </>
      )
    }
    if (current < 10 && pages.length > 10) {
      const pagesToRender = pages.slice(0, 10);
      const pagination = pagesToRender.map((page, index) => (
          <LinkContainer key={index} to={link + page}>
            <Pagination.Item active={page === current}>
              {page}
            </Pagination.Item>
          </LinkContainer>
      ));
      return (
          <>
            {pagination}
            <LinkContainer to={link + pages.slice(10, 11)}>
              <Pagination.Ellipsis />
            </LinkContainer>
            <LinkContainer to={link + this.props.pageCount}>
              <Pagination.Item active={this.props.pageCount === current}>
                {this.props.pageCount}
              </Pagination.Item>
            </LinkContainer>
          </>
      )
    } else {
        return pages.map((page, index) => (
            <LinkContainer key={index} to={link + page}>
              <Pagination.Item active={page === current}>
                {page}
              </Pagination.Item>
            </LinkContainer>
        ))
    }
  }
  render() {
    if (this.props.pageCount === undefined || this.props.current === undefined)
      return null;
    return (
        <Pagination className={'justify-content-center'}>
          {this.renderPages()}
        </Pagination>
  );
  }
}
PaginationComponent.propTypes = {
  current: PropTypes.any,
  pageCount: PropTypes.number
};
export default PaginationComponent;
