import'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line no-unused-vars
import $ from'jquery';
// eslint-disable-next-line no-unused-vars
import Popper from 'popper.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Shell from "./container/shell";
import Home from "./container/home";
import Login from "./container/login";
import * as redux from "./store";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={redux.default().store}>
          <PersistGate loading={null} persistor={redux.default().persistor}>
              <Shell>
                  <Router basename={'/'}>
                      <div className="App">
                          <Switch>
                              <Route path={'/home'} exact component={Home} />
                              <Route path={'/'} exact component={Login} />
                          </Switch>
                      </div>
                  </Router>
              </Shell>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
