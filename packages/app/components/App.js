import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";
import { authSuccess, signout } from "../actions/user/actions";
import Login from "./Login";

const App = () => {
  const [isAuth, setAuth] = useState(() => Boolean(token));
  const authToken = useSelector(state => state.user.token);
  const token = window.localStorage.getItem("za-token");

  useEffect(() => {
    const tokenValue = Boolean(authToken) ? authToken : "";

    if (tokenValue) {
      window.localStorage.setItem("za-token", tokenValue);
    } else {
      window.localStorage.setItem("za-token", "");
    }

    setAuth(Boolean(tokenValue));
  }, [authToken]);

  return <>{isAuth ? <Layout /> : <Login />}</>;
};

export default App;
