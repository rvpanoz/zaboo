import React from "react";
import { useDispatch } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { evalCode } from "actions/system/actions";

const AppToolbar = () => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(evalCode());

  return (
    <div>
      <Toolbar>
        <Button color="inherit" onClick={onClick}>
          Visualize
        </Button>
      </Toolbar>
    </div>
  );
};

export default AppToolbar;
