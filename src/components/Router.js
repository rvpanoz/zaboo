import React from "react";
import { Route, Redirect } from "react-router-dom";

// Normalize all paths to not have trailing slashes even if they
// matched <Route> with one:
const Router = ({ children }) => (
  <Route
    render={({ location: { pathname, search, hash } }) =>
      pathname !== "/" && pathname.slice(-1) === "/" ? (
        <Redirect to={`${pathname.slice(0, -1)}${search}${hash}`} />
      ) : (
        children
      )
    }
  />
);

export default Router;
