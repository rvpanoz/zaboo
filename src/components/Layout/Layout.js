import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppSnackBar from "components/common/AppSnackBar";
import Visualizer from "components/Visualizer";
import Dashboard from "components/Dashboard";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Layout = () => {
  const classes = useStyles();
  const sidebarOpen = useSelector(({ ui }) => ui.sidebarOpen);
  const systemMessage = useSelector(({ system }) => system.message);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarOpen
        })}
      >
        <div className={classes.flexItemG1}>
          <Visualizer />
        </div>
        <div>
          <Dashboard />
        </div>
      </main>
      {systemMessage && <AppSnackBar message={systemMessage}></AppSnackBar>}
    </div>
  );
};

export default Layout;
