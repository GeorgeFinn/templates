import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import LoadingBar from "react-redux-loading";
import { injectGlobal } from 'styled-components';

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/shared/PrivateRoute";
import App from "./containers/App";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import Signup from "./containers/Signup";
import CreateProfile from './containers/CreateProfile'

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import store from "./store";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
  }
}

ReactDom.render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <App>
          <LoadingBar />
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          </Switch>
        </App>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("app")
);

injectGlobal`
  main {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 20px;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
  }
  a {
    text-decoration: none;
  }
  button {
    outline: none;
  }
`

module.hot.accept();
