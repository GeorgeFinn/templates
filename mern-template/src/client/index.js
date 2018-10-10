import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { injectGlobal } from 'styled-components';

import App from "./containers/App";
import Home from "./containers/Home";

ReactDom.render(
    <Router>
      <Fragment>
        <App>
          <Route exact path="/" component={Home} />
        </App>
      </Fragment>
    </Router>,
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
