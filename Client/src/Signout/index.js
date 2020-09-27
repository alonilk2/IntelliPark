import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/authActions';
import history from '../history';
function Signout(props) {
    const userInstance = useSelector(state=>state.user);
    const {loggedin, error, user} = userInstance;
    const dispatch = useDispatch();
    if(user){
        dispatch(signout(user));
    }
    useEffect(() => {
        if(user) {
            console.log(error);
        }
        else {
            return history.push('/');
        }
        return () => {
        };
    }, [user]);
    return null;
}

export default Signout;