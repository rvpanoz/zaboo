import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";
import { authSuccess } from "../actions/user/actions";
import Login from "./Login";

const token = window.localStorage.getItem("za-token");

const App = () => {
  const [isAuth, setAuth] = useState(() => Boolean(token));
  const authToken = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenValue = Boolean(authToken) ? authToken : "";

    if (tokenValue) {
      window.localStorage.setItem("za-token", tokenValue);
      dispatch(authSuccess(tokenValue));
    } else {
      window.localStorage.setItem("za-token", "");
    }

    setAuth(Boolean(tokenValue));
  }, [authToken]);

  return <>{isAuth ? <Layout /> : <Login />}</>;
};

export default App;
