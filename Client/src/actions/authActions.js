import Cookie from 'js-cookie';
import Axios from "axios";
import { USER_SIGNIN_ATTEMPT, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED,
        USER_SIGNUP_ATTEMPT, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED,
        USER_SIGNOUT_SUCCESS} from '../Constants/userConst';

const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_ATTEMPT, payload: {email, password}});
    try {
        const user = await Axios.post("http://localhost:3001/login", {email,password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: user});
        Cookie.set('userInstance', JSON.stringify(user));
    }
    catch (err) {
        dispatch({type: USER_SIGNIN_FAILED, payload: err});
    }
}

const signup = (username, password, email, firstname, lastname) => async (dispatch) => {
    dispatch({type: USER_SIGNUP_ATTEMPT, payload: {username, password, email, firstname, lastname}});
    try {
        const user = await Axios.post("http://localhost:3001/register", {username, password, email, firstname, lastname});
        dispatch({type: USER_SIGNUP_SUCCESS, payload: user});
        Cookie.set('userInstance', JSON.stringify(user));
    }
    catch (err) {
        dispatch({type: USER_SIGNUP_FAILED, payload: err});
    }
}

const signout = () => (dispatch) => {
    Cookie.remove('userInstance');
    dispatch({type: USER_SIGNOUT_SUCCESS});
}

export {signin, signup, signout};