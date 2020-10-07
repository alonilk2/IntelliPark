import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route} from 'react-router-dom';
import Login from './Screens/Login/Login';
import history from './history';
import { Provider } from 'react-redux';
import store from './store';
import SignUp from './Screens/Signup';
import Signout from './Screens/Signout';
import userProfile from './Screens/UserProfile';
import CarEdit from './car/CarEdit';

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>      
        <Router history={history}>
          <div>
            <Route exact path="/" component={App}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/Signup" component={SignUp}></Route>
            <Route path="/Signout" component={Signout}></Route>
            <Route path="/userProfile" component={userProfile}></Route>
            <Route path="/CarEdit" component={CarEdit}></Route>
          </div>
        </Router>
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
