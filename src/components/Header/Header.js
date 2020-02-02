import React from "react";
import { func, bool } from "prop-types";
import { useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { signout } from "actions/user/actions";
import styles from "./styles";

const useStyles = makeStyles(styles);

const Header = ({ sidebarOpen, toggleDrawer }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const signoutUser = () => dispatch(signout());

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: sidebarOpen
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            zaboo
          </Typography>
          <Button color="inherit" onClick={signoutUser}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  sidebarOpen: bool.isRequired,
  toggleDrawer: func.isRequired
};

export default Header;
