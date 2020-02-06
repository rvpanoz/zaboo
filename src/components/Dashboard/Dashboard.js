import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "components/SearchBar";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SearchBar
        actionText="Fetch"
        placeHolder="Enter a soundcloud stream url"
      />
    </div>
  );
};

export default Dashboard;
