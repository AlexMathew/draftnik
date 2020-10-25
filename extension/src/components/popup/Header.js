import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { connect } from "react-redux";
import { fetchStaticData } from "../../actions";
import { ACTIONS } from "../../constants";

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
        <Toolbar variant="dense">
          <div className={classes.grow}>
            <div className={classes.header}>
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
          <Tooltip title="Refresh">
            <IconButton
              color="inherit"
              onClick={() => {
                this.props.fetchStaticData();
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go To Dashboard">
            <IconButton
              color="inherit"
              onClick={() => {
                chrome.runtime.sendMessage({ action: ACTIONS.OPEN_DASHBOARD });
              }}
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrappedHeader = connect(null, { fetchStaticData })(Header);
export default withStyles(styles)(wrappedHeader);
