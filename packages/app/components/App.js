import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";
import useLocalStorage from "../useLocalStorage";
import { authSuccess, authFailure } from "../actions/user/actions";

const App = () => {
  const [token] = useLocalStorage("zb_token", undefined);
  const authToken = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  window.addEventListener("load", event => {
    if (authToken) {
      return;
    }

    if (token) {
      dispatch(authSuccess(token));
    }
  });

  return (
    <div>
      <Layout isAuthenticated={Boolean(authToken)} />
    </div>
  );
};

export default App;
