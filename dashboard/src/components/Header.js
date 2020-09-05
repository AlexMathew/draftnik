import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import { switchMobile, fetchStaticData } from "../actions";
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
    display: "flex",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  logo: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  brandName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "large",
    },
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
          <div className={classes.grow}>
            <div
              className={classes.header}
              onClick={() => this.props.fetchStaticData()}
            >
              <Avatar src="/icons/logo192.png" className={classes.logo} />
              <Typography
                variant="h5"
                color="inherit"
                className={classes.brandName}
              >
                Draftnik
              </Typography>
            </div>
          </div>
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

const wrappedHeader = connect(mapStateToProps, {
  switchMobile,
  fetchStaticData,
})(Header);
export default withStyles(styles)(wrappedHeader);
