
import React, { useEffect, useState} from 'react';
import './login.css';
import history from '../../history';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../actions/authActions';
import NavBar from '../../navbar';
function Login(props) {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userInstance = useSelector(state => state.user);
  const { user, error} = userInstance;
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
      <div className="main-sec">          
        {error && <div className="alert alert-danger" role="alert">
          Wrong Email and\or Password
        </div>}
          <div className="row login-content">
            <div className="col-8">
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
              </form>
            </div>
            <div className="col-4">
              <button type="button" className="btn btn-lg btn-block signin-buttons"><img alt="" className="icon-btn" src="https://cdn.worldvectorlogo.com/logos/google-icon.svg"></img>
                Sign in with Google</button>
              <button type="button" className="btn btn-lg btn-block signin-buttons"><img alt="" className="icon-btn" src="https://www.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-circle-512.png"></img>
                Sign in with Facebook</button>
            </div>
            
          </div>
        
      </div>
    </div> 
  );
}
export default Login;
