import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Components/Navbar/Navigation";
import Homepage from "./Components/Pages/Homepage";
import FooterComponent from "./Components/Footer/FooterComponent";
import SearchBar from "./Components/SearchBar";
import { Route, Switch } from 'react-router-dom';
import RegisterPage from "./Components/Pages/RegisterPage";
import LoginPage from "./Components/Pages/LoginPage";
import OfferPage from "./Components/Pages/OfferPage";
import OffersPage from "./Components/Pages/OffersPage";
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from "prop-types";
import Toast from "react-bootstrap/Toast";


class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.getToken = this.getToken.bind(this);
    this.state = {
      token: '',
    }
  }
  componentDidMount() {
    this.getToken()
  }
  handleLogout() {
    const { cookies } = this.props;
    cookies.remove('token');
    this.getToken()
  }

  getToken() {
    const { cookies } = this.props;
    this.setState({token: cookies.get('token')})
  }
  render() {
    return (
          <div className="App bg-light">
            <Navigation token={this.state.token} onLogout={() => this.handleLogout()} />
            <SearchBar />
            <Switch className='main-content'>
              <Route path='/' component={Homepage} exact/>
              <Route path='/register' component={RegisterPage}/>
              <Route path='/login' render={(props) => <LoginPage {...props} token={this.state.token} setToken={this.getToken} />} />
              <Route path='/adpage' component={OfferPage}/>
              <Route path='/offers' component={OffersPage}/>
            </Switch>
            <FooterComponent />
          </div>
    );
  }
}
export default withCookies(App);
