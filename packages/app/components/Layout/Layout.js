import React, { useCallback } from "react";
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

const Layout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(state => state.ui.sidebar);
  const toggleDrawer = useCallback(() => dispatch(toggleSidebar(!sidebarOpen)));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header sidebarOpen={sidebarOpen} toggleDrawer={toggleDrawer} />
      <Sidebar open={sidebarOpen} theme={theme} toggleDrawer={toggleDrawer} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarOpen
        })}
      >
        <Login />
      </main>
    </div>
  );
};

export default Layout;
