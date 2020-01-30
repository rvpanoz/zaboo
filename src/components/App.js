import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthorizedRoute from "./AuthorizedRoute";
import Router from "./Router";
import Layout from "./Layout";
import Login from "./Login";
import Signup from "./Signup";
import NotFound from "./NotFound";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/404" component={NotFound} />
        <AuthorizedRoute path="/" component={Layout} />
        <Redirect to="404" />
      </Switch>
    </Router>
  );
};
export default App;
