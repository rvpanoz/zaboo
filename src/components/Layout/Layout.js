import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppSnackBar from "components/common/AppSnackBar";
import Visualizer from "components/Visualizer1";
import SearchBar from "components/SearchBar";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Layout = () => {
  const classes = useStyles();
  const systemMessage = useSelector(({ system }) => system.message);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.top}>
          <SearchBar />
        </div>
        <div className={classes.main}>
          <Visualizer />
        </div>
      </main>
      {systemMessage && <AppSnackBar message={systemMessage}></AppSnackBar>}
    </div>
  );
};

export default Layout;
