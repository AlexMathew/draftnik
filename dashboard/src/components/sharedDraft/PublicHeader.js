import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DirectToLandingPage from "./DirectToLandingPage";
import CloneDraft from "./CloneDraft";
import history from "../../history";
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
            <div className={classes.header} onClick={() => history.push("/")}>
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
