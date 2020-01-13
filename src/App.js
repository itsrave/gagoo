import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Components/Navbar/Navigation";
import Homepage from "./Components/Pages/Homepage";
import FooterComponent from "./Components/Footer/FooterComponent";
import SearchBar from "./Components/SearchBar";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterPage from "./Components/Pages/RegisterPage";
import LoginPage from "./Components/Pages/LoginPage";
import AdPage from "./Components/Pages/AdPage";


function App() {
  return (
        <div className="App bg-light">
          <Navigation />
          <SearchBar />
          <Switch className='main-content'>
            <Route path='/' component={Homepage} exact/>
            <Route path='/register' component={RegisterPage}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/adpage' component={AdPage}/>
          </Switch>
          <FooterComponent />
        </div>
  );
}

export default App;
