import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

const TrackItem = ({ data }) => {
  const classes = useStyles();
  const {
    id,
    artwork_url,
    title,
    duration,
    uri,
    stream_url,
    streamable
  } = data;

  return (
    <div key={id.toString()}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={artwork_url} />
        </ListItemAvatar>
        <ListItemText primary={title} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default TrackItem;
