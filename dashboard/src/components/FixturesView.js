import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import {} from "../actions";

const drawerWidth = 350;

const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
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
        <Divider />
        <Typography variant="h5">FIXTURES</Typography>
      </div>
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

const mapStateToProps = () => {
  return {};
};

const wrappedFixturesView = connect(mapStateToProps, {})(FixturesView);
export default withStyles(styles)(wrappedFixturesView);
