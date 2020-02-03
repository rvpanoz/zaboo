import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import { toggleSidebar } from "actions/ui/actions";
import AppSnackBar from "components/common/AppSnackBar";
import Sidebar from "components/Sidebar";
import Header from "components/Header";
import Dashboard from "components/Dashboard";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Layout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(({ ui }) => ui.sidebarOpen);
  const systemMessage = useSelector(({ system }) => system.message);

  const toggleDrawer = () =>
    dispatch(
      toggleSidebar({
        isOpen: !sidebarOpen
      })
    );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar open={sidebarOpen} theme={theme} toggleDrawer={toggleDrawer} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarOpen
        })}
      >
        <div style={{ padding: 60 }}>
          <Dashboard />
        </div>
      </main>
      {systemMessage && <AppSnackBar message={systemMessage}></AppSnackBar>}
    </div>
  );
};

export default Layout;
