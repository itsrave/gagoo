import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Components/Navbar/Navigation";
import Homepage from "./Components/Pages/Homepage";
import FooterComponent from "./Components/Footer/FooterComponent";
import SearchBar from "./Components/SearchBar";

function App() {
  return (
    <div className="App">
      <Navigation />
      <SearchBar />
      <Homepage />
      <FooterComponent />
    </div>
  );
}

export default App;
