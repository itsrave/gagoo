import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import {Col, Container, Row} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Loading from "../Various/Loading";
import Nav from "react-bootstrap/Nav";
import Settings from "../User/Settings";
import MyOffers from "../Various/MyOffers";

class MyAccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offersActive: false,
      settingsActive: false,
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.match.params.reference === 'settings') {
        this.setState({offersActive: false, settingsActive: true})
      }
      else {
        this.setState({offersActive: true, settingsActive: false})
      }
    }
  }

  componentDidMount() {
    if (this.props.match.params.reference === 'settings') {
      this.setState({offersActive: false, settingsActive: true})
    }
    else {
      this.setState({offersActive: true, settingsActive: false})
    }
  }
  toggleOffersActive = () => {
    this.setState({offersActive: true, settingsActive: false});
    this.props.history.push('/account/myoffers/1');
  };
  toggleSettingsActive = () => {
    this.setState({offersActive: false, settingsActive: true});
    this.props.history.push('/account/settings');
  };
  renderTab() {
    if (this.props.match.params.reference === 'settings') {
      return <Settings token={this.props.token} />
    } else {
      return <MyOffers token={this.props.token} />
    }
  }
  render() {
    return (
      <Container>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link onClick={this.toggleOffersActive} className={this.state.offersActive ? 'active' : null}>Moje ogłoszenia</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={this.toggleSettingsActive} className={this.state.settingsActive ? 'active' : null}>Ustawienia</Nav.Link>
          </Nav.Item>
        </Nav>
        { this.renderTab() }
      </Container>
    );
  }
}

export default MyAccountPage;
