
import React, {Component} from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import Loginnavbarcmp from './Screens/Login/login-navbar-btn-cmp';
class NavBar extends Component {
	render() {
		return (
            <header className="App-header">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link to="/" className="navbar-brand" href="#">
                    <img src={require('./logo.png')} width="40" height="50" className="d-inline-block align-top" alt="" loading="lazy"></img>
                    IntelliPark
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        <button className="nav-link" href="#">Home <span className="sr-only">(current)</span></button>
                        </li>
                        <li className="nav-item">
                        <button className="nav-link" href="#">Link</button>
                        </li>
                        <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <button className="dropdown-item" href="#">Action</button>
                            <button className="dropdown-item" href="#">Another action</button>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" href="#">Something else here</button>
                        </div>
                        </li>
                        <li className="nav-item">
                        <button className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</button>
                        </li>
                    </ul>
                    <Loginnavbarcmp />
                    </div>
                </nav>
        </header>
		)
	}
}

export default NavBar;