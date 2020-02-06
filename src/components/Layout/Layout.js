import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppSnackBar from "components/common/AppSnackBar";
import AudioPlayer from "components/AudioPlayer";
import Visualizer from "components/Visualizer";
import SearchBar from "components/SearchBar";
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
        <div>
          <SearchBar />
        </div>
        <div>
          <Visualizer />
        </div>
        <div>
          <AudioPlayer />
        </div>
      </main>
      {systemMessage && <AppSnackBar message={systemMessage}></AppSnackBar>}
    </div>
  );
};

export default Layout;
