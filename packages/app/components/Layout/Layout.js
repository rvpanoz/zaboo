import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";

import Sidebar from "../Sidebar";
import Header from "../Header";
import Login from "../Login";
import styles from "./styles";
import { toggleSidebar } from "../../actions/ui/actions";

const useStyles = makeStyles(styles);

const Layout = ({ isAuthenticated }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(state => state.ui.sidebarOpen);
  const toggleDrawer = () => dispatch(toggleSidebar(!sidebarOpen));

  useEffect(() => {
    console.log("render");
  }, [isAuthenticated]);

  console.log("first render", isAuthenticated);
  return (
    <div className={classes.root}>
      <CssBaseline />
      {isAuthenticated && (
        <Header sidebarOpen={sidebarOpen} toggleDrawer={toggleDrawer} />
      )}
      {isAuthenticated && (
        <Sidebar open={sidebarOpen} theme={theme} toggleDrawer={toggleDrawer} />
      )}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarOpen
        })}
      >
        {!isAuthenticated ? (
          <Login />
        ) : (
          <div style={{ padding: 60 }}>Hole!</div>
        )}
      </main>
    </div>
  );
};

Layout.defaultProps = {
  isAuthenticated: false
};

export default Layout;
