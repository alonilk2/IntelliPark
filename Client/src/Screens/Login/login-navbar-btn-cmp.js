import React, {Component, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import cookie from 'js-cookie';
import './login-navbar-btn-cmp.css';
import { signout, getavatar } from '../../actions/authActions';
import { Base64 } from 'js-base64';



class loginnavbarcmp extends Component {
    isLoggedIn = () => {
        //const userInstance = useSelector(state=>state.user);
        const userInstance = cookie.get('userInstance');
        const dispatch = useDispatch();
        const [imgString, setImage] = useState('');
        if(userInstance) {
            const user = JSON.parse(userInstance);
            const img = dispatch(getavatar({'email':user.data.email}));
            var imgstr = img.then((res) => {
                let u8s = new Uint8Array(res.data.image.data);
                setImage("data:"+res.data.contentType+";base64,"+Base64.fromUint8Array(u8s));
            }).catch(err => console.log(err));
            return (
                <form className="form-inline my-2 my-lg-0">
                    <img src={imgString} className="user-avatar-icon" alt="avatar"></img>
                    <button className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <button className="dropdown-item">Hello {user.data.firstname}</button>
                        <Link className="dropdown-item" to='/userprofile'>My Profile</Link>
                        <div className="dropdown-divider"></div>
                        <button onClick={()=>{dispatch(signout())}} className="dropdown-item">Logout</button>
                    </div>
                </form>
            );
        }
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