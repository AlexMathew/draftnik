import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DirectToLandingPage from "./DirectToLandingPage";
import CloneDraft from "./CloneDraft";
import { AUTH_TOKEN_FIELD } from "../../constants";

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
    color: "black",
  },
  grow: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
  },
  logo: {
    margin: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  landingPageButton: {
    fontSize: "large",
    fontWeight: "bold",
  },
});

class PublicHeader extends React.Component {
  render() {
    const { classes, found, draftCode } = this.props;
    const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow}>
            <Avatar src="/icons/logo192.png" className={classes.logo} />
            <Typography variant="h5" color="inherit">
              Draftnik
            </Typography>
          </div>
          {found && authToken ? (
            <CloneDraft draftCode={draftCode} />
          ) : (
            <DirectToLandingPage />
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

PublicHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicHeader);
