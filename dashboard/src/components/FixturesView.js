import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import FixturesList from "./fixturesView/FixturesList";
import { Divider } from "@material-ui/core";

const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.only("md")]: {
      width: theme.spacing(30),
      flexShrink: 0,
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(40),
    },
  },
  drawerPaper: {
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(30),
    },
    width: theme.spacing(40),
  },
  toolbar: theme.mixins.toolbar,
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
        <Hidden smUp implementation="js">
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
