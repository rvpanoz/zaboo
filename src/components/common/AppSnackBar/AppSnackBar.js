import React, { useState } from "react";
import { string } from "prop-types";
import { useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { clearSystemMessage } from "actions/system/actions";

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const AppSnackBar = ({ severity, message }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(Boolean(message));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    dispatch(clearSystemMessage());
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

AppSnackBar.defaultProps = {
  severity: "default"
};

AppSnackBar.propTypes = {
  message: string.isRequired,
  severity: string
};
export default AppSnackBar;
