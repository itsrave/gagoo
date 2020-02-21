import React, {Component} from 'react';
import './Components/Css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Components/Navbar/Navigation";
import Homepage from "./Components/Pages/Homepage";
import FooterComponent from "./Components/Footer/FooterComponent";
import SearchBar from "./Components/SearchBar";
import {Route, Switch} from 'react-router-dom';
import RegisterPage from "./Components/Pages/RegisterPage";
import LoginPage from "./Components/Pages/LoginPage";
import OfferPage from "./Components/Pages/OfferPage";
import OffersPage from "./Components/Pages/OffersPage";
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from "prop-types";
import MyAccountPage from "./Components/Pages/MyAccountPage";
import AddOfferPage from "./Components/Pages/AddOfferPage";
import CategoryChooser from "./Components/Various/CategoryChooser";
import AdminPage from "./Components/Pages/AdminPage";
import axios from "axios";
import path from "./api";

// TODO REWORK COOKIES
class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.setToken = this.setToken.bind(this);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token') || '',
      isAdminAuthed: false,
      userData: {
        username: '...'
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.token !== prevState.token) {
      this.setToken();
      this.getUserData();
    }
  }
  getUserData() {
    const AuthStr = 'Bearer ' + this.state.token;
    axios
        .get(path + 'api/user/get-data',{ headers: { Authorization: AuthStr } })
        .then(res => {
          this.setState({userData: res.data});
        })
        .catch(err => {
          console.log(err);
        });
  }
  componentDidMount() {
    this.setToken();
    this.getUserData();
  }
  handleLogout() {
    const { cookies } = this.props;
    cookies.remove('token');
    this.setToken()
  }
  setToken() {
    const { cookies } = this.props;
    this.setState({token: cookies.get('token')})
  }
  render() {
    return (
          <div className="App bg-light">
            <Navigation token={this.state.token} userData={this.state.userData} onLogout={() => this.handleLogout()} />
            <SearchBar />
            <Switch className='main-content'>
              <Route path='/' component={Homepage} exact/>
              <Route path='/adminpanel' component={AdminPage} />
              <Route path='/register' component={RegisterPage}/>
              <Route path='/login' render={(props) => <LoginPage {...props} token={this.state.token} setToken={this.setToken} />} />
              <Route path='/offerpage' component={OfferPage}/>
              <Route path='/offers' component={OffersPage}/>
              <Route path='/addoffer' render={(props) => <AddOfferPage {...props} token={this.state.token} />}/>
              <Route path='/cat' component={CategoryChooser}/>/>
              <Route path='/account/:reference' render={(props) => <MyAccountPage {...props} token={this.state.token} />}/>
            </Switch>
            <FooterComponent />
          </div>
    );
  }
}
export default withCookies(App);
