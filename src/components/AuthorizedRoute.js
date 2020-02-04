import React, { useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import { func } from "prop-types";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const AuthorizedRoute = ({ component, ...rest }) => {
  const NOW = new Date();
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

AuthorizedRoute.propTypes = {
  component: func.isRequired
};

export default AuthorizedRoute;
