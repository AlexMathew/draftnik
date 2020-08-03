import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import { switchMobile } from "../actions";
import { AUTH_TOKEN_FIELD } from "../constants";
import history from "../history";

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
    color: "black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={this.props.switchMobile}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Draftnik
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              logout();
            }}
          >
            <ExitToAppIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    mobileOpen: state.responsive.mobileOpen,
  };
};

const wrappedHeader = connect(mapStateToProps, { switchMobile })(Header);
export default withStyles(styles)(wrappedHeader);
