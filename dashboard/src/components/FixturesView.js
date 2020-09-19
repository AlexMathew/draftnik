import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import FixturesList from "./fixturesView/FixturesList";
import { Divider } from "@material-ui/core";

const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(40),
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: theme.spacing(40),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
  },
});

class FixturesView extends React.Component {
  render() {
    const { classes } = this.props;
    const fixtures = (
      <>
        <div className={classes.toolbar} />
        <Divider />
        <FixturesList />
      </>
    );

    return (
      <nav className={classes.drawer}>
        <Hidden xsUp implementation="js">
          {fixtures}
        </Hidden>
        <Hidden xsDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            anchor="right"
          >
            {fixtures}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

FixturesView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FixturesView);
