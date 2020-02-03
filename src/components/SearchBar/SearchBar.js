import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { fetchTracks } from "actions/tracks/actions";

import config from "config";
import styles from "./styles";

const useStyles = makeStyles(styles);

const SearchBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles(styles);
  const rootRef = useRef();
  const inputRef = useRef();

  const onSearch = () => {
    const {
      current: { value }
    } = inputRef;
    const {
      api: { tracks: tracksUrl },
      client_id
    } = config;

    if (!value) {
      return;
    }

    const payload = {
      url: `${tracksUrl}/?client_id=${client_id}`,
      q: value,
      filter: "public",
      format: "json",
      linked_partitioning: 1,
      limit: 5
    };

    dispatch(fetchTracks(payload));
  };

  const onKeyDown = e => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      onSearch();
    }
  };

  return (
    <div className={classes.root} ref={rootRef}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onKeyDown={onKeyDown}
          inputProps={{ "aria-label": "search", ref: inputRef }}
        />
      </div>
      <div className={classes.action}>
        <Button color="inherit" onClick={onSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
