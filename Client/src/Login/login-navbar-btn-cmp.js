import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import './login-navbar-btn-cmp.css';
class loginnavbarcmp extends Component {
    isLoggedIn = () => {
        const userInstance = useSelector(state=>state.user);
        if(userInstance.user) return (
            <form className="form-inline my-2 my-lg-0">
                <img src={userInstance.user.data.avatar} className="user-avatar-icon"></img>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item">Hello {userInstance.user.data.firstname}</a>
                    <a className="dropdown-item" href="#">My Profile</a>
                    <div className="dropdown-divider"></div>
                    <Link to="/Signout" className="dropdown-item" href="#">Logout</Link>
                </div>
            </form>
        );
        else return (<form className="form-inline my-2 my-lg-0">
        <a href="/Login/login" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Login</a>
        <Link to="/Signup" href="#" className="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Sign Up</Link>
    </form>);
    }
	render() {
		return (
            <div>            
                <this.isLoggedIn />
            </div>
		)
	}
}

export default loginnavbarcmp;