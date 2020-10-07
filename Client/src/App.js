import React, { Component } from 'react';
import './App.css';
import NavBar from './navbar';
import CarList from './car/carlist';
import Body from './body';


class App extends Component {

  render () {
    return (    
      <div className="App">
        <NavBar />
        <Body />

      </div>
    );
  }
}

export default App;
