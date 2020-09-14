import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ProvideAuth } from "./utils/use-auth";

import Login from './pages/Login'
import Room from './pages/Room'
import Error from './pages/Error'

import './App.css'

const App = () => {
  return (
    <div className="App" >
      <ProvideAuth>
        <Router>
          <Switch>
            <Route exact path="/room" component={Room} />
            <Route exact path="/error" component={Error} />
            <Route component={Login} />
            {/* <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/profile/:name" component={ProfileWrapper} /> */}
          </Switch>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;