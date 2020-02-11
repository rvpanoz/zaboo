const styles = theme => ({
  root: {
    width: "100%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  top: {
    position: "relative",
    top: 0,
    padding: theme.spacing(1)
  },
  main: {
    backgroundColor: "#00000a",
    flexGrow: 1
  }
});

export default styles;
