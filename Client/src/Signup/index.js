import React, { useState, useEffect } from 'react';
import './index.css';
import NavBar from '../navbar';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/authActions';
import history from '../history';
import { render } from '@testing-library/react';
function Signup(props) {
    
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password, setPassword] = useState('');
    const [email1, setEmail1] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    var secPasswordTypedFlag = false;
    const userInstance = useSelector(state => state.user);
    const { loggedin, registering, user, error } = userInstance;
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signup(username, password, email, firstname, lastname));
    }

    useEffect(() => {
        if(user) {
          history.push('/');
        }
        return () => {
        };
      }, [user]);
      const checkEqualPasswords = () => {
          if(password!=password1 && secPasswordTypedFlag==true)
            return <div class="alert alert-danger" role="alert">Make sure that both passwords are the same!</div>
      }
        return (
            <div>
                <NavBar />
                {error && <div class="alert alert-danger" role="alert">
                    This email address is already registered.
                </div>}
                {checkEqualPasswords()}
                <form onSubmit={handleSubmit}>
                    <div className="was-validated">
                        <div class="form-row">
                        <div class="col-md-6 mb-3">
                        <label for="validationServer01">First name</label>
                        <input type="text" className="form-control is-invalid" id="validationTextarea" onChange={(e) => setFirstname(e.target.value)} required></input>
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <label for="validationServer02">Last name</label>
                        <input type="text" className="form-control is-invalid" id="validationTextarea" onChange={(e) => setLastname(e.target.value)} required></input>
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                        <label for="validationServer03">Email</label>
                        <input type="email" className="form-control is-invalid" id="validationTextarea" onChange={(e) => setEmail1(e.target.value)} aria-describedby="validationServer03Feedback" required></input>
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            Please provide a valid email.
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <label for="validationServer04">Retype Email</label>
                        {/*Update email state only if #1 email input is identical to #2 email input.*/}
                        <input type="email" className="form-control is-invalid" id="secemail" onChange={(e) => {if (email1===document.getElementById('secemail').value) {
                            setEmail(e.target.value);
                        }}} aria-describedby="validationServer03Feedback" required></input>
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            Please provide a valid email.
                        </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                        <label for="validationServer04">Username</label>
                        <input type="text" className="form-control is-invalid" id="validationTextarea" onChange={(e) => setUsername(e.target.value)} aria-describedby="validationServer03Feedback" required></input>
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            Please provide a valid username.
                        </div>
                        </div>
                        <div class="col-md-3 mb-3">
                        <label for="validationServer03">Password</label>
                        <input type="password" className="form-control is-invalid" id="validationTextarea" onChange={(e) => setPassword1(e.target.value)} aria-describedby="validationServer03Feedback" required></input>
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            Please provide a valid password.
                        </div>
                        </div>
                        <div class="col-md-3 mb-3">
                        <label for="validationServer04">Retype Password</label>
                        <input type="password" className="form-control is-invalid" id="password" onChange={(e) => {
                            secPasswordTypedFlag = true; console.log(secPasswordTypedFlag);
                            if(password1===document.getElementById('password').value) setPassword(e.target.value);
                            else {setPassword('null'); console.log('password1: '+password1+' password:'+password);}
                        }} aria-describedby="validationServer03Feedback" required></input>
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            Please provide a valid password.
                        </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="form-check">
                        <input class="form-check-input is-invalid" type="checkbox" value="" id="form-control is-invalid" aria-describedby="invalidCheck3Feedback" required></input>
                        <label class="form-check-label" for="invalidCheck3">
                            Agree to terms and conditions
                        </label>
                        <div  id="invalidCheck3Feedback" class="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Submit form</button>
                    </div></form></div>
        )
}

export default Signup;