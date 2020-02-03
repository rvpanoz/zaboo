import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "components/SearchBar";
import TracksList from "components/Tracks";

import styles from "./styles";

const useStyles = makeStyles(styles);

const Dashboard = () => {
  const classes = useStyles(styles);

  return (
    <div className={classes.root}>
      <SearchBar />
      <TracksList />
    </div>
  );
};

export default Dashboard;
