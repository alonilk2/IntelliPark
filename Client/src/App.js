import React, { Component } from 'react';
import './App.css';
import NavBar from './navbar';
import CarList from './car/carlist';
import Body from './body';
import Footer from './footer';

class App extends Component {

  render () {
    return (    
      <div className="App">
        <NavBar />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
