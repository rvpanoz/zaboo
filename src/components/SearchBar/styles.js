const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  search: {
    flexGrow: 1,
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: theme.shape.borderRadius
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7)
  },
  action: {
    marginLeft: theme.spacing(1)
  }
});

export default styles;
