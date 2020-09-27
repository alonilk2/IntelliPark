
import React, { Component, useEffect, useState} from 'react';
import './login.css';
import httpService from '../HttpService';
import history from '../history';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/authActions';
import NavBar from '../navbar';
const http = new httpService();
function Login(props) {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userInstance = useSelector(state => state.user);
  const { logging, loggedin, user, error} = userInstance;
  const dispatch = useDispatch();
  const login = (event) => {
    event.preventDefault();
    dispatch(signin(Email, password));
    if(error) {
      console.log("error");
    }
  }
  //useEffect triggers when side effects occur
  useEffect(() => {
    if(user) {
      history.push('/');
    }
    return () => {
    };
  }, [user]);
  return (    
    <div>          
      <NavBar />
      {error && <div class="alert alert-danger" role="alert">
        Wrong Email and\or Password
      </div>}
      <form className="was-validated" onSubmit={login}>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Email</label>
          <input type="Email" className="form-control is-invalid" id="validationTextarea" aria-describedby="UsernameHelp" onChange={(e) => setEmail(e.target.value)} required></input>
          <small id="EmailHelp" className="form-text text-muted">We'll never share your Email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control is-invalid" id="validationTextarea" onChange={(e) => setPassword(e.target.value)} required></input>
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
          <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>
        <input type="submit" className="btn btn-primary" value="Login"></input>
      </form></div>
  );
}
export default Login;
