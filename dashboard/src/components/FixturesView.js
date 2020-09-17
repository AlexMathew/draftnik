import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import FixturesList from "./fixturesView/FixturesList";

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
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        <Divider />
        <FixturesList />
      </div>
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
            <div className={classes.toolbar} />
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
