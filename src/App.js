import React, {Component} from 'react';
import './Components/Css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Components/Navbar/Navigation";
import Homepage from "./Components/Pages/Homepage";
import FooterComponent from "./Components/Footer/FooterComponent";
import SearchBar from "./Components/SearchBar";
import { Redirect, Route, Switch } from 'react-router-dom';
import RegisterPage from "./Components/Pages/RegisterPage";
import LoginPage from "./Components/Pages/LoginPage";
import OfferPage from "./Components/Pages/OfferPage";
import OffersPage from "./Components/Pages/OffersPage";
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from "prop-types";
import MyAccountPage from "./Components/Pages/MyAccountPage";
import AddOfferPage from "./Components/Pages/AddOfferPage";
import AdminPage from "./Components/Pages/AdminPage";
import axios from "axios";
import path from "./api";
import UserOffersPage from "./Components/Pages/UserOffersPage";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import EmailToast from "./Components/User/EmailToast";
import AdminOfferPage from "./Components/Pages/AdminOfferPage";
import My404Component from "./Components/Pages/My404Component";
import { getStandardAjaxConfig } from "./Components/User/UserFunctions";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.setToken = this.setToken.bind(this);
    const {cookies} = props;
    this.state = {
      token: cookies.get('token') || '',
      isAdminAuthed: false,
      isLoggedIn: false,
      userData: {
        username: '...',
        emailVerification: true,
      }
    }
  }

  getInitialState() {
    this.setState({
      token: '',
      isAdminAuthed: false,
      isLoggedIn: false,
      userData: {
        username: '...',
        emailVerification: true,
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.token !== prevState.token) {
      this.setToken();
      this.getUserData();
    }
  }

  getUserData() {
    // if (this.state.token) {
    //   return;
    // }
    //console.log('getUserData');

    axios
      .get(path + 'api/user/get-data', getStandardAjaxConfig(this.state.token))
      .then(res => {
        this.setState({userData: res.data});
        let admin = this.state.userData.roles.includes("ROLE_MODERATOR");
        let user = this.state.userData.roles.includes("ROLE_USER");
        this.setState({isAdminAuthed: admin, isLoggedIn: user})
      })
      .catch(err => {
        this.setState({isLoggedIn: false})
      });
  }

  componentDidMount() {
    const { cookies } = this.props;
    const refreshToken = cookies.get('refreshToken');

    this.setToken();
    this.getUserData();

    if (refreshToken !== undefined) {
      this.refreshSession();
    }

    this.startTimer();
  }

  handleLogout() {
    console.log("Handle logout");

    const { cookies } = this.props;
    cookies.remove('token');
    cookies.remove('refreshToken');

    this.getInitialState();

    localStorage.clear();
  }

  setToken() {
    const { cookies } = this.props;
    this.setState({token: cookies.get('token')})
  }

  startTimer() {
    setInterval(this.refreshSession.bind(this), 3300000);
  }

  refreshSession() {
    const { cookies } = this.props;
    let token = {
      refresh_token: cookies.get('refreshToken'),
    };
    axios
      .post(path + 'api/token/refresh', token)
      .then(res => {
        cookies.set('token', res.data.token, {path: '/'});
        cookies.set('refreshToken', res.data.refresh_token, {path: '/'});
        this.setToken();
      })
      .catch(err => {
        console.log('lol');
        console.log(err.response.data);
      });
  }

  render() {
    return (
      <div className="App bg-light">
        <EmailToast emailVerification={this.state.userData.emailVerification} token={this.state.token} />
        <Navigation token={this.state.token} userData={this.state.userData} onLogout={() => this.handleLogout()}/>
        <SearchBar />

        <Switch className='main-content'>
          <Route path='/' component={Homepage} exact/>
          <Route path='/adminpanel/:page' render={(props) => (this.state.isAdminAuthed === true ?
            <AdminPage {...props} token={this.state.token} /> : <Redirect to='/'/>)}/>
          <Route path='/admin/offer/:offerPublicIdentifier' render={(props) => this.state.isAdminAuthed === true ?
            <AdminOfferPage {...props} token={this.state.token} /> : <Redirect to='/'/> }/>
          <Route path='/register' render={(props) => (this.state.isLoggedIn === false ? <RegisterPage {...props}  /> :
            <Redirect to='/'/>)}/>
          <Route path='/login/:reference?' render={(props) => (this.state.isLoggedIn === false ?
            <LoginPage {...props} token={this.state.token} setToken={this.setToken}/> : <Redirect to='/'/>)}/>
          <Route path='/forgotpassword' component={ForgotPassword}/>
          <Route path='/offerpage/:offerId' component={OfferPage} />
          <Route path='/offers/:sortBy/:order/:category?/:page/' component={OffersPage}/>
          <Route path='/useroffers/:userID/:page/' component={UserOffersPage}/>
          <Route path='/addoffer' render={(props) => (this.state.isLoggedIn === true ?
            <AddOfferPage {...props} token={this.state.token}/> : <Redirect to='/login/nologin'/>)}/>
          <Route path='/account/:reference/:page?/' render={(props) => (this.state.isLoggedIn === true ?
            <MyAccountPage {...props} token={this.state.token}/> : <Redirect to='/login/nologin'/>)}/>
          <Route path='*' exact={true} component={My404Component} />
        </Switch>

        <FooterComponent/>
      </div>
    );
  }
}

export default withCookies(App);
