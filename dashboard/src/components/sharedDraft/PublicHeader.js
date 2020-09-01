import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import DirectToLandingPage from "./DirectToLandingPage";
import CloneDraft from "./CloneDraft";

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

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow}>
            <Avatar src="/icons/logo192.png" className={classes.logo} />
            <Typography variant="h5" color="inherit">
              Draftnik
            </Typography>
          </div>
          {found ? (
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

const mapStateToProps = (state) => {
  return {};
};

const wrappedPublicHeader = connect(mapStateToProps, {})(PublicHeader);
export default withStyles(styles)(wrappedPublicHeader);
