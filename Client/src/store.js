import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {authReducer} from './reducers/authReducer';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';


const user = Cookie.getJSON('userInstance')|| null;
var initialState = 0;
if(user){
    initialState = {
        user: user,
        loggedin: true
    }
} else {
    initialState = {}
}
const Red = combineReducers({
    user : authReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Red, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;