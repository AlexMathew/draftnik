import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ACTIONS } from "../../constants";

const styles = (theme) => ({
  main: {
    width: theme.spacing(40),
    height: theme.spacing(30),
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(-3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  text: {
    fontSize: "large",
  },
  button: {
    marginTop: theme.spacing(2),
    fontSize: "medium",
  },
});

class NoAuth extends React.Component {
  triggerSignIn = () => {
    chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar src="/icons/logo128.png" className={classes.avatar} />
          <Typography className={classes.text}>
            You are not signed in.
          </Typography>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={this.triggerSignIn}
          >
            Sign In
          </Button>
        </Paper>
      </main>
    );
  }
}

NoAuth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoAuth);
