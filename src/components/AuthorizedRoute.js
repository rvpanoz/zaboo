import React, { useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const NOW = new Date();

const AuthorizedRoute = ({ component, ...rest }) => {
  const authToken = useSelector(state => state.user.token);
  const isTokenExpired = useMemo(() => {
    try {
      const tokenExpiration = jwtDecode(authToken).exp;

      return tokenExpiration < Math.round(NOW.getTime() / 1000);
    } catch (error) {
      return true;
    }
  });

  if (!authToken || isTokenExpired) {
    return <Redirect to="/signin" />;
  }

  return <Route component={component} {...rest} />;
};

export default AuthorizedRoute;
