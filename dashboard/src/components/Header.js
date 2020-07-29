import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AUTH_TOKEN_FIELD } from "../constants";
import history from "../history";

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
});

class Header extends React.Component {
  render() {
    const { classes } = this.props;

    const logout = () => {
      localStorage.removeItem(AUTH_TOKEN_FIELD);
      history.push("/signin");
    };

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Draftnik
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
