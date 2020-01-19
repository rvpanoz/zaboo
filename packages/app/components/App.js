import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Router from "./Router";
import Layout from "./Layout";
import Login from "./Login";
import Signup from "./Signup";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/app" component={Layout} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
