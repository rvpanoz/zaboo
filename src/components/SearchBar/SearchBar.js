import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { resolveTrack } from "actions/tracks/actions";
import styles from "./styles";

const useStyles = makeStyles(styles);

const SearchBar = ({ actionText, placeHolder }) => {
  const dispatch = useDispatch();
  const classes = useStyles(styles);
  const inputRef = useRef();

  const onSearch = () => {
    const {
      current: { value }
    } = inputRef;

    if (!value) {
      return;
    }

    dispatch(resolveTrack({ url: value }));
  };

  const onKeyDown = e => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      onSearch();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={placeHolder}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onKeyDown={onKeyDown}
          inputProps={{
            "aria-label": placeHolder,
            ref: inputRef
          }}
        />
      </div>
      <div className={classes.action}>
        <Button color="inherit" onClick={onSearch}>
          {actionText}
        </Button>
      </div>
    </div>
  );
};

SearchBar.defaultProps = {
  placeHolder: "Search",
  actionText: "Search"
};

export default SearchBar;
