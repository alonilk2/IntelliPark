import React, { Component } from 'react';
import './App.css';
import httpService from './HttpService';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Login from './Login/Login'
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from './navbar';
import CarList from './car/carlist';
import Body from './body';

const http = new httpService();

class App extends Component {
  render () {
    return (    
      <div className="App">
        <NavBar />
        <Body />
        <CarList />
      </div>
    );
  }
}

export default App;
