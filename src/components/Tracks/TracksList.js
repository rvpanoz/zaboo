import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import TrackItem from "./TrackItem";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

const TracksList = () => {
  const tracks = useSelector(({ track }) => track.tracks);
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {tracks.map(track => (
        <TrackItem data={track} />
      ))}
    </List>
  );
};

export default TracksList;
