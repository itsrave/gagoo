import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from "react-router-dom";
import '../Css/Additional.css';

class ParentCategories extends Component {
  render() {
    return (
      <>
        <ul className="homePage__parentCategories">
          {this.props.categories.map(
            category => <li key={category.uniqueId} className="homePage__parentCategories-category">
              <LinkContainer to={`/offers/date/asc/${category.uniqueId}/1`}>
                <Link to={`/offers/date/asc/${category.uniqueId}/1`} className="homePage__link">{ category.name }</Link>
              </LinkContainer>
              <small className="homePage__parentCategories-small" title="Suma wszystkich ogłoszeń w tej kategorii i pochodnych">
                ({ category.offerCount })
              </small>
            </li>
          )}
        </ul>
      </>
    );
  }
}

export default ParentCategories;
