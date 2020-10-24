import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
    color: "black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
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

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow}>
            <div className={classes.header} onClick={() => {}}>
              <Avatar
                src={chrome.extension.getURL("icons/logo128.png")}
                className={classes.logo}
              />
              <Typography
                variant="h5"
                color="inherit"
                className={classes.brandName}
              >
                Draftnik
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
