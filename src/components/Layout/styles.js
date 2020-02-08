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
    flexGrow: 1
  }
  // main: {
  //   width: "100%",
  //   position: "absolute",
  //   bottom: 0,
  //   minHeight: 65
  // }
});

export default styles;
